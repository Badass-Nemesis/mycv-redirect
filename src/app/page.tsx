import Explaination from "@/components/Explaination";
import CatMemes from "@/components/CatMemes";
import StatusLoading from "@/components/StatusLoading";

export default function Home() {
  return (
    <>
      <div className="bg-slate-500 min-h-[700px] p-5 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <Explaination />
          <StatusLoading />
        </div>
        <CatMemes />
      </div>
    </>
  );
}
