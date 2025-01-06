'use client'

import { useEffect, useState } from "react";
import Timer from "./Timer";

interface StatusObject {
    statusCode: string,
    body: string,
}

export default function StatusLoading() {
    const [message, setMessage] = useState<StatusObject>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<boolean>(false);
    const [automaticRedirect, setAutomaticRedirect] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120);

    useEffect(() => {
        const callApiGateway = async () => {
            try {
                const response = await fetch("/api/callApiGateway");
                const data = (await response.json()) as StatusObject;

                setMessage(data);

                if (data.body) {
                    if (data.body === '"The instance is running already."') {
                        setTimer(5);
                        setRedirect(true);
                    } else if (data.body === '"An error happened in handler function. Please check logs."'
                        || "The API network response was not ok") {
                        setTimer(prev => prev + 10);
                    }
                } else {
                    console.log(`why no body? data: ${JSON.stringify(data)}`);
                }

                setTimeout(callApiGateway, 8000); // every 8 seconds
            } catch (error) {
                console.error("Error in callApiGateway: ", error);
                setError(error as Error);

                setTimeout(callApiGateway, 8000); // every 8 seconds
            }
        };

        callApiGateway();
    }, []);

    const toggleAutoRedirect = () => setAutomaticRedirect(true);

    return (
        <>
            <div className="bg-blue-500 flex flex-col items-center justify-center h-64 rounded-xl gap-4 p-2">
                <div className="text-2xl font-semibold text-center">{message ? (
                    (message.body === '"An error happened in handler function. Please check logs."') ?
                        <p>
                            An error happened because of DNS propagation. Don't worry it'll get fixed
                            automatically in 60-90 seconds.
                        </p>
                        : message.body)
                    : <p>Still Loading..</p>}</div>
                {error && (<div className="text-2xl font-semibold ">{error.message}</div>)}
                {redirect ? (<div className="flex flex-row text-2xl font-semibold">You will be redirected in&nbsp;
                    {<Timer duration={timer} autoRedirect={toggleAutoRedirect} />}
                    &nbsp;seconds...</div>
                ) : (<div className="flex flex-row text-2xl font-semibold">Initializing, Please wait for&nbsp;
                    {<Timer duration={timer} autoRedirect={toggleAutoRedirect} />}
                    &nbsp;seconds...</div>
                )}
                {automaticRedirect && (
                    <button
                        onClick={() => { window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL! }}
                        className="rounded-lg bg-yellow-500 px-3 py-2"
                    >
                        If you aren't redirected then click me
                    </button>
                )}

            </div>
        </>
    );
}