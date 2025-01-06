'use client'

import { useEffect, useState } from "react";

interface TimerProps {
    duration: number;
    autoRedirect: () => void;
}

export default function Timer({ duration, autoRedirect }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState<number>(duration);

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
                    autoRedirect();
                    redirectToUrl();
                    return 0;
                }

            })
        }, 1000); // every 1 second

        return () => clearInterval(interval);
    }, [duration])

    return (
        <>
            <div className="text-sm md:text-xl font-semibold">{timeLeft}</div>
        </>
    );
}