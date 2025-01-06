import Explaination from "@/components/Explaination";
import CatMemes from "@/components/CatMemes";
import StatusLoading from "@/components/StatusLoading";

export default function Home() {
  return (
    <>
      <div className="bg-slate-500 min-h-[700px] p-5 rounded-xl">
        <p className="mb-4 text-sm md:text-base font-mono font-bold tracking-tight leading-tight">
          P.S. - This is a barebone web app that I made so that at least I can get it all up and running,
          since the Lambda functions are all finished and working in AWS. I'll finish this whole thing in few days, maybe.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <StatusLoading />
          <Explaination />
        </div>
        <CatMemes />
      </div>
    </>
  );
}
