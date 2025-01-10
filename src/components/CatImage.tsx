"use client"; 

interface CatImageProps {
    url: string; 
}

export default function CatImage({ url }: CatImageProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            {url ? (
                <img
                    src={url}
                    alt="Random cat"
                    width={200}
                    height={200}
                    className="rounded-lg shadow-lg shadow-red-600"
                />
            ) : (
                <div className="w-40 h-40 md:w-60 md:h-60 bg-gray-200 rounded-lg animate-pulse"></div>
            )}
        </div>
    );
}
