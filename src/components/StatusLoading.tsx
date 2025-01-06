'use client'

import { useState } from "react";
import RedirectStatusLoading from "@/components/RedirectStatusLoading";

export default function App() {
    const [showRedirectStatusLoading, setShowRedirectStatusLoading] = useState(true);

    const toggleRedirectStatusLoading = () => setShowRedirectStatusLoading(!showRedirectStatusLoading);

    return (
        <div className="bg-blue-500 flex flex-col items-center justify-center min-h-30 rounded-xl px-2 py-4">
            {showRedirectStatusLoading ? (
                <RedirectStatusLoading />
            ) : (
                <div className="text-sm md:text-xl font-semibold text-center">
                    Redirect process is stopped. Click the button to start again.
                </div>
            )}
            <button
                onClick={toggleRedirectStatusLoading}
                className="mt-4 rounded-lg bg-red-500 px-3 py-2 text-sm md:text-xl font-mono font-semibold tracking-tighter"
            >
                {showRedirectStatusLoading ? 'Stop Redirect Process' : 'Start Redirect Process'}
            </button>
        </div>
    );
}