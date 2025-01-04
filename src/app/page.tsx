export default function Home() {
  return (
    <>
      <div className="bg-slate-500 min-h-[700px] p-5 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500 text-2xl font-semibold flex items-center justify-center h-64 rounded-xl">
            Please wait while we redirect you to the cv
          </div>
          <div className="bg-blue-500 text-2xl font-semibold flex items-center justify-center h-64 rounded-xl">
            This is for loading bar
          </div>
        </div>
        <div className="bg-pink-500 mt-4 min-h-[400px] rounded-xl flex items-center justify-center text-2xl font-semibold">
          This is for cat memes
        </div>
      </div>
    </>
  );
}
