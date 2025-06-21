"use client";
"lucide-react";
import VideoGrid from "@/components/VideoGrid";
import Filterbar from "./_components/Filterbar";
import Relevancebar from "./_components/Relevancebar";
import Searchbar from "./_components/Searchbar";

export default function CommunityPage() {
  return (
    <div className="flex-1 flex flex-col items-center font-nunito">
      <Searchbar />

      <div className="mt-8 w-full  md:max-w-xl xl:max-w-1/3 items-center gap-2 flex justify-between px-6">
        <Relevancebar />
        <Filterbar />
      </div>

      <VideoGrid />
    </div>
  );
}
