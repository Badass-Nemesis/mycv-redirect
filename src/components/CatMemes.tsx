'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

interface CatImage {
    _id: string;
    mimetype: string;
    size: number;
    tags: number[];
}

export default function CatMemes() {
    const [catImages, setCatImages] = useState<CatImage[]>([]);

    useEffect(() => {
        const fetchCatImages = async () => {
            try {
                const response = await fetch('https://cataas.com/api/cats?limit=3')
                const data = await response.json();
                setCatImages(data);
            } catch (error) {
                console.log('Error fetching cat images: ', error);
            }
        }

        fetchCatImages();
    }, [])

    return (
        <>
            <div className="text-2xl font-semibold p-4">This is for Cat Memes </div>
            <div className="grid grid-cols-3 gap-4">
                {catImages.map((cat) => (
                    <div key={cat._id} className="flex justify-center">
                        <img
                            src={`https://cataas.com/cat/${cat._id}`}
                            alt="CatMeme"
                            width={200}
                            height={200}
                            className="rounded-lg shadow-lg shadow-red-600"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
