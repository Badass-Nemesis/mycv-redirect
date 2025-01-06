import CatImage from "./CatImage";

export default function CatMemes() {
    return (
        <>
            <div className="bg-pink-500 mt-4 min-h-40 md:min-h-[300px] rounded-xl flex flex-col items-center justify-center gap-4 px-2 py-4">
                <div className="text-base md:text-xl font-mono font-semibold">Enjoy some cat pics </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <CatImage />
                    <div className="hidden md:inline-block"><CatImage /></div>
                    <div className="hidden md:inline-block"><CatImage /></div>
                </div>
            </div>
        </>
    );
}
