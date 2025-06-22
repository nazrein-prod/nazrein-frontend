"use client";

// EAF27C;

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="container flex items-center justify-center flex-col mx-auto py-4">
      <h1 className="text-5xl text-center font-nunito font-bold tracking-wide max-w-md md:max-w-full">{`Track what's changed`}</h1>
      <h1 className="mt-4 text-md font-medium text-muted-foreground">
        Monitor how video titles and thumbnails change over time.
      </h1>
      <div className="relative mt-8 w-5/6 lg:w-1/2 rounded-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
        <Input
          placeholder="Paste your video link here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-black focus:outline-none font-nunito"
        />
      </div>
    </div>
  );
}
