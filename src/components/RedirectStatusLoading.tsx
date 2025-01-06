'use client'

import { useEffect, useState, useRef } from "react";
import Timer from "./Timer";

interface StatusObject {
    statusCode: string,
    body: string,
}

export default function RedirectStatusLoading() {
    const [message, setMessage] = useState<StatusObject>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<boolean>(false);
    const [automaticRedirect, setAutomaticRedirect] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120);

    useEffect(() => {
        const callApiGateway = async () => {
            while (true) {
                try {
                    const response = await fetch("/api/callApiGateway");
                    const data = (await response.json()) as StatusObject;

                    setMessage(data);

                    if (data.body) {
                        if (data.body === '"The instance is running already."') {
                            setTimer(5);
                            setRedirect(true);
                            break;
                        } else if (data.body === '"An error happened in handler function. Please check logs."' ||
                            data.body === "The API network response was not ok") {
                            setTimer(prev => prev + 10);
                        }
                    } else {
                        console.log(`why no body? data: ${JSON.stringify(data)}`);
                    }

                    await new Promise(resolve => setTimeout(resolve, 8000)); // every 8 seconds
                } catch (error) {
                    console.error("Error in callApiGateway: ", error);
                    setError(error as Error);

                    await new Promise(resolve => setTimeout(resolve, 8000)); // every 8 seconds
                }
            }
        };

        callApiGateway();
    }, []);

    const toggleAutoRedirect = () => setAutomaticRedirect(true);

    return (
        <>
            <div className="bg-blue-500 flex flex-col items-center justify-center min-h-35 rounded-xl gap-4 md:mb-2">
                <div className="text-sm md:text-xl font-semibold text-center">{message ? (
                    (message.body === '"An error happened in handler function. Please check logs."') ?
                        <p>
                            An error happened because of DNS propagation. Don't worry it'll get fixed
                            automatically in 60-90 seconds.
                        </p>
                        : message.body)
                    : <p>Still Loading..</p>}</div>
                {error && (<div className="text-sm md:text-xl font-semibold ">{error.message}</div>)}
                <div className="flex flex-row text-sm md:text-xl font-semibold">
                    {redirect ? <span>You will be redirected in&nbsp;</span> : <span>Initializing, Please wait for&nbsp;</span>}
                    {<Timer duration={timer} autoRedirect={toggleAutoRedirect} />}&nbsp;seconds...
                </div>
                {automaticRedirect && (
                    <button
                        onClick={() => { window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL! }}
                        className="rounded-lg bg-yellow-500 px-3 py-2 text-sm md:text-xl font-mono font-semibold tracking-tighter"
                    >
                        If you aren't redirected then click me
                    </button>
                )}
            </div>
        </>
    );
}
