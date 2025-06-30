"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { WandSparkles, Check, TrendingUp, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const topics = [
  {
    value: "Video",
    label: "Video",
  },
  {
    value: "Channel",
    label: "Channel",
  },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular");
  const [searchTopic, setSearchTopic] = useState<"Video" | "Channel">("Video");
  const [openTopicMenu, setOpenTopicMenu] = useState<boolean>(false);
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <WandSparkles className="h-8 w-8 text-black" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Community Tracks
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover what others are tracking
          </p>
          <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder={`Search ${searchTopic}s...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg pl-6 pr-32 rounded-full border-2 border-gray-200 focus:border-black shadow-lg"
                  maxLength={500}
                />

                <Popover open={openTopicMenu} onOpenChange={setOpenTopicMenu}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={"sm"}
                      role="combobox"
                      className="absolute right-2 top-2 h-10 px-4 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full cursor-pointer"
                    >
                      {searchTopic}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-24 p-0 text-center">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {topics.map((topic) => (
                            <CommandItem
                              key={topic.value}
                              value={topic.value}
                              onSelect={(currentValue) => {
                                setSearchTopic(
                                  currentValue as "Video" | "Channel"
                                );
                                setOpenTopicMenu(false);
                              }}
                              className="cursor-pointer"
                            >
                              {topic.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  searchTopic === topic.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant={sortBy === "popular" ? "default" : "outline"}
                onClick={() => setSortBy("popular")}
                className="gap-2 rounded-full cursor-pointer"
                size="sm"
              >
                <TrendingUp className="h-4 w-4" />
                Popular
              </Button>
              <Button
                variant={sortBy === "recent" ? "default" : "outline"}
                onClick={() => setSortBy("recent")}
                className="gap-2 rounded-full cursor-pointer"
                size="sm"
              >
                <Clock className="h-4 w-4" />
                Recent
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
