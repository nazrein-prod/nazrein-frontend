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
import { WandSparkles, Check, TrendingUp, Clock, Search } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Autocomplete from "./Autocomplete";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getAutocompleteVideoNames } from "@/lib/video";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q")?.toString() ?? "";

  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular");
  const [searchTopic, setSearchTopic] = useState<"Video" | "Channel">("Video");
  const [openTopicMenu, setOpenTopicMenu] = useState<boolean>(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: async () => {
      const res = await getAutocompleteVideoNames(debouncedQuery);
      return res.data.map((item: { title: string }) => item.title);
    },
    enabled: debouncedQuery.length >= 2,
  });

  function handleSelect(title: string) {
    setSearchQuery(title);
    setShowSuggestions(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    if (params.toString() == "") {
      router.replace(`${pathname}?sortBy=${sortBy}&type=${searchTopic}`);
    } else {
      router.replace(
        `${pathname}?${params.toString()}&sortBy=${sortBy}&type=${searchTopic}`
      );
    }

    router.refresh();
  }

  return (
    <section className="relative">
      <form className="container mx-auto px-4 py-16" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <WandSparkles className="h-8 w-8 " />
            <h1 className="text-4xl md:text-6xl font-bold  pb-4">
              Community Nazars
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg md:text-xl  mb-8 max-w-2xl mx-auto -mt-4">
            <p>Discover what others are watching</p>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder={`Search ${searchTopic}s...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="h-14 text-lg pr-6 pl-24 rounded-full border-2 border-gray-500 focus:border-secondary shadow-lg selection:bg-secondary selection:text-primary"
                  maxLength={500}
                  onBlur={() => setShowSuggestions(false)}
                  onFocus={() => {
                    if (debouncedQuery.length >= 2) setShowSuggestions(true);
                  }}
                />

                <Autocomplete
                  suggestions={suggestions}
                  isLoading={isLoading}
                  handleSelect={handleSelect}
                  visible={showSuggestions}
                />

                <Button
                  variant="outline"
                  size={"sm"}
                  className="absolute right-2 top-2 h-10 px-4 bg-primary text-secondary hover:bg-gray-800 hover:text-secondary rounded-full cursor-pointer"
                >
                  <Search size={14} />
                </Button>

                <Popover open={openTopicMenu} onOpenChange={setOpenTopicMenu}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={"sm"}
                      role="combobox"
                      className="absolute left-2 top-2 h-10 px-4 bg-primary text-secondary hover:bg-gray-800 hover:text-secondary rounded-full cursor-pointer w-20"
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
              transition={{ duration: 0.6 }}
            >
              <Button
                onClick={() => setSortBy("popular")}
                className={cn(
                  "gap-2 rounded-full cursor-pointer",
                  sortBy === "popular"
                    ? "bg-secondary text-primary hover:bg-secondary hover:text-primary border"
                    : "bg-primary text-secondary hover:bg-primary hover:text-secondary border border-secondary"
                )}
                size="sm"
              >
                <TrendingUp className="h-4 w-4" />
                Popular
              </Button>
              <Button
                onClick={() => setSortBy("recent")}
                className={cn(
                  "gap-2 rounded-full cursor-pointer",
                  sortBy === "recent"
                    ? "bg-secondary text-primary hover:bg-secondary hover:text-primary border"
                    : "bg-primary text-secondary hover:bg-primary hover:text-secondary border border-secondary"
                )}
                size="sm"
              >
                <Clock className="h-4 w-4" />
                Recent
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </form>
    </section>
  );
}
