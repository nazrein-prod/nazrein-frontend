import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

const relevancy = [
  {
    value: "Relevant",
    label: "Relevant",
  },
  {
    value: "Popular",
    label: "Popular",
  },
  {
    value: "New",
    label: "New",
  },
];

export default function Relevancebar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Relevant");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="cursor-pointer border-none pl-2 font-semibold shadow-none hover:bg-transparent"
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
              {relevancy.map((r) => (
                <CommandItem
                  key={r.value}
                  value={r.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {r.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === r.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
