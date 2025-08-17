import { Loader2Icon } from "lucide-react";

function PageLoading() {
  return (
    <div className="grid h-screen w-full grid-cols-1 items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader2Icon className="animate-spin text-muted-foreground w-8 h-8 sm:w-12 sm:h-12" />
        <span className="font-mono text-muted-foreground text-md sm:text-xl flex gap-2">
          LOADING{" "}
          <div className="flex gap-1">
            <div className="animate-bounce">.</div>{" "}
            <div className="animate-bounce delay-150">.</div>{" "}
            <div className="animate-bounce delay-300">.</div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default PageLoading;
