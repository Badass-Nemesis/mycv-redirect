'use client'

import Image from "next/image"; // slow net issues if I use this
import { useEffect, useState } from "react";
import CatImage from "./CatImage";

export default function CatMemes() {


    return (
        <>
            <div className="bg-pink-500 mt-4 min-h-[400px] rounded-xl flex items-center justify-center gap-4">
                <div className="text-2xl font-semibold">This is for Cat Memes </div>
                <CatImage />
                <CatImage />
                <CatImage />
            </div>
        </>
    );
}
