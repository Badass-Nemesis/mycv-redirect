'use client'

import { useEffect, useState } from "react";

interface StatusObject {
    statusCode: string,
    body: string,
}

export default function StatusLoading() {
    const [message, setMessage] = useState<StatusObject>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<boolean>(false);
    const [automaticRedirect, setAutomaticRedirect] = useState<boolean>(false);

    useEffect(() => {
        const numberOfCalls = 8;

        const callApiGateway = async () => {
            for (let i = 0; i < numberOfCalls; i++) {
                try {
                    const response = await fetch("/api/callApiGateway");
                    const data = (await response.json()) as StatusObject;

                    setMessage(data);

                    if (data.body === '"The instance is running already."' || i === (numberOfCalls - 1)) {
                        setRedirect(true);
                        break;
                    }

                    await new Promise(resolve => setTimeout(resolve, 8000));
                } catch (error) {
                    console.error("Error: ", error);
                    setError(error as Error);
                }
            }
        };

        callApiGateway();
        // setRedirect(true);
    }, []);

    useEffect(() => {
        if (redirect) {
            const delayAndRedirect = async () => {
                await new Promise(resolve => setTimeout(resolve, 5000));
                setAutomaticRedirect(true);
                window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL!;
            }

            delayAndRedirect();
        }
    }, [redirect]);

    return (
        <>
            <div className="bg-blue-500 flex flex-col items-center justify-center h-64 rounded-xl gap-4 p-2">
                <div className="text-2xl font-semibold text-center">{message ? (
                    (message.body === '"An error happened in handler function. Please check logs."') ?
                        <p>
                            An error happened because of DNS propagation. Don't worry it'll get fixed
                            automatically in 60-90 seconds.
                            <br />
                            This happens due to taking time in setting domain's DNS (basically IP
                            address of server and domain aren't fully connected in the internet). It takes time
                            to set the server's ip address in all regions.
                        </p>
                        : message.body)
                    : <p>Still Loading..</p>}</div>
                {error && (<div className="text-2xl font-semibold ">{error.message}</div>)}
                {redirect && (<div className="text-2xl font-semibold ">You will be redirected now in 5 seconds...</div>)}
                {automaticRedirect && (
                    <button
                        onClick={() => { window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL! }}
                        className="rounded-lg bg-yellow-500 px-4 py-6"
                    >
                        If you aren't redirected then click me
                    </button>
                )}
            </div>
        </>
    );
}