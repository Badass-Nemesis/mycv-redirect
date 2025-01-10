'use client'

import { useEffect, useState } from "react";

interface StatusObject {
    statusCode: number,
    body: string,
}

export default function RedirectStatusLoading() {
    const [message, setMessage] = useState<StatusObject>();
    const [error, setError] = useState<Error | { message: string }>();
    const [redirect, setRedirect] = useState<boolean>(false);
    const [automaticRedirect, setAutomaticRedirect] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(240);

    const toggleAutoRedirect = () => setAutomaticRedirect(true);
    const redirectToUrl = () => {
        window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL!;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) {
                    return prev - 1;
                } else {
                    clearInterval(interval);
                    toggleAutoRedirect();
                    redirectToUrl();
                    return 0;
                }
            });
        }, 1000); // every 1 second

        return () => clearInterval(interval);
    }, [timeLeft]);

    // THIS IS THE MAIN BOSS. THE MAIN USE EFFECT. TREAT IT WITH CARE
    useEffect(() => {
        // using controller and a boolean flag now to ensure I'll not be calling api automatically when unmounted
        const abortController = new AbortController();
        let isMounted = true;

        // I was frustrated to see the increase timeLeft by 10 secs code in every if block
        const handleError = (errorMessage: string) => {
            setError({ message: errorMessage });
            setTimeLeft(prev => prev + 10);
        };

        const callApiGateway = async () => {
            const maxNumberOfSuccessfullCalls = 10;
            let numberOfSuccessfullCalls = 0;

            while (isMounted && numberOfSuccessfullCalls < maxNumberOfSuccessfullCalls) {
                try {
                    const response = await fetch("/api/callApiGateway", {
                        signal: abortController.signal, // passing the signal to fetch so that I can abort it when wanted
                    });
                    const data = (await response.json()) as StatusObject;

                    if (!isMounted) return; // just simply exit if the component is unmounted

                    setMessage(data);

                    if (data.body) {
                        if (data.body === '"The instance is running already."' ||
                            numberOfSuccessfullCalls >= maxNumberOfSuccessfullCalls) {
                            setTimeLeft(100);
                            setRedirect(true);
                            break;
                        } else if (data.body === '"An error happened in handler function. Please check logs."' ||
                            data.body === "The API network response was not ok") {
                            handleError("API response was not ok, Or the lambda function dropped dead");
                        }
                    } else if (data.statusCode && data.statusCode === 500) {
                        handleError("The lambda function dropped dead");
                    } else {
                        console.log(`why no body? data: ${JSON.stringify(data)}`);
                        handleError("No body found in the response of lambda function");
                    }

                    numberOfSuccessfullCalls++;
                } catch (error) {
                    if (!isMounted) return; // need one isMounted check here too

                    if (error instanceof Error) {
                        if (error.name !== "AbortError") {
                            console.error("Error in callApiGateway: ", error);
                            handleError(error.message);
                        }
                    } else {
                        console.error("Unknown error in callApiGateway: ", error);
                        handleError("An unknown error occurred");
                    }
                }

                if (isMounted) {
                    await new Promise(resolve => setTimeout(resolve, 8000)); // waiting 8 sec before next call
                }
            }
        };

        callApiGateway();

        // this is a cleanup function activated when unmounted
        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, []);

    return (
        <>
            <div className="bg-blue-500 flex flex-col items-center justify-center min-h-35 rounded-xl gap-4 md:mb-2">
                <div className="text-sm md:text-xl font-semibold text-center">{(!error && message) ? (
                    (message.body === '"An error happened in handler function. Please check logs."'
                        || message.statusCode === 500) ?
                        <p>
                            An error happened because of DNS propagation. Don't worry it'll get fixed
                            automatically in 60-90 seconds.
                        </p>
                        : message.body)
                    : <p>Still Loading..</p>}</div>
                {error && (<div className="text-sm md:text-xl font-semibold text-center">{error.message}</div>)}
                <div className="inline-flex text-sm md:text-xl font-semibold text-center">
                    {redirect ? "Please wait for DNS propagation to complete. You will be automatically redirected in "
                        : "Initializing, Please wait for "}
                    {timeLeft}&nbsp;seconds...
                </div>
                {automaticRedirect && (
                    <button
                        onClick={() => { window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL! }}
                        className="rounded-lg bg-yellow-500 px-3 py-2 text-sm md:text-xl font-mono font-bold md:font-semibold tracking-tighter"
                    >
                        If you aren't redirected then click me
                    </button>
                )}
            </div>
        </>
    );
}
