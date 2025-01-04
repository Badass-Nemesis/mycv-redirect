import PleaseWait from "@/components/PleaseWait";
import LoadingDiv from "@/components/LoadingDiv";
import CatMemes from "@/components/CatMemes";

export default function Home() {
  return (
    <>
      <div className="bg-slate-500 min-h-[700px] p-5 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500 flex items-center justify-center h-64 rounded-xl">
            <PleaseWait />
          </div>
          <div className="bg-blue-500 flex items-center justify-center h-64 rounded-xl">
            <LoadingDiv />
          </div>
        </div>
        <div className="bg-pink-500 mt-4 min-h-[400px] rounded-xl flex items-center justify-center">
          <CatMemes />
        </div>
      </div>
    </>
  );
}
