"use client"; 

import { useState, useEffect } from "react";
import CatImage from "./CatImage";
import { motion } from "framer-motion";

export default function CatMemes() {
    const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""]); // I need to make a variable for number of images

    // this is updating the url, causing the component to re-render
    const updateImageUrl = (index: number, url: string) => {
        setImageUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index] = url;
            return updatedUrls;
        });
    };

    // at least this is fetching new images from cataas api
    useEffect(() => {
        imageUrls.forEach((_, index) => {
            fetchNewImage(index);
        });
    }, []);

    const fetchNewImage = async (index: number) => {
        try {
            const response = await fetch("https://cataas.com/cat?json=true");
            if (!response.ok) {
                throw new Error("Failed to fetch cat image");
            }
            const data = await response.json();
            if (!data._id) {
                throw new Error("Invalid API response: _id not found");
            }
            const newImageUrl = `https://cataas.com/cat/${data._id}`;
            updateImageUrl(index, newImageUrl);
        } catch (error) {
            console.error("Error fetching cat image:", error);
        }
    };

    return (
        <div className="bg-pink-500 mt-4 min-h-40 md:min-h-[300px] rounded-xl flex flex-col items-center justify-center gap-4 px-2 py-4">
            <div className="text-base md:text-xl font-mono font-bold md:font-semibold">
                Enjoy some cat pics
            </div>
            <motion.div
                className="flex flex-col md:flex-row gap-4"
                animate={{ x: [0, 100, 0] }} // moving from left to right ?
                transition={{ duration: 5, repeat: Infinity }} // make this an infinite loop
            >
                {imageUrls.map((url, index) => (
                    <CatImage
                        key={index}
                        url={url}
                    />
                ))}
            </motion.div>
        </div>
    );
}
