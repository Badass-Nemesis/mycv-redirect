import Explaination from "@/components/Explaination";
import CatMemes from "@/components/CatMemes";
import StatusLoading from "@/components/StatusLoading";

export default function Home() {
  return (
    <>
      <div className="bg-slate-500 min-h-[700px] p-5 rounded-xl">
        P.S. - This is a barebone site that I made so that atleast I can get it all up and running, 
        since the Lambda functions are all finished and running. I'll finish it in few days.
        <div className="grid grid-cols-2 gap-4">
          <Explaination />
          <StatusLoading />
        </div>
        <CatMemes />
      </div>
    </>
  );
}
