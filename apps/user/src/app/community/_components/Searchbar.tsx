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
import { ChevronDown, Check, Search } from "lucide-react";
import { useState } from "react";

const frameworks = [
  {
    value: "Video",
    label: "Video",
  },
  {
    value: "Channel",
    label: "Channel",
  },
];

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Video");
  return (
    <div className="mt-8 flex w-full max-w-sm md:max-w-xl xl:max-w-1/3 items-center gap-2 relative">
      <Input
        type="email"
        placeholder={`Search ${value}s...`}
        className="p-6 rounded-full"
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between absolute right-12 top-1/2 transform -translate-y-1/2 border-none shadow-none font-semibold hover:bg-transparent cursor-pointer"
          >
            {value}
            <ChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-24 p-0 text-center">
          <Command>
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        type="submit"
        variant="outline"
        className="justify-between absolute right-2 top-1/2 transform -translate-y-1/2  rounded-full  shadow-none border-none cursor-pointer bg-black text-white hover:bg-black hover:text-white"
      >
        <Search />
      </Button>
    </div>
  );
}
