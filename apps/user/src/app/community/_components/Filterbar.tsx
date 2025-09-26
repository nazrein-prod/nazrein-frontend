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

const filter = [
  {
    value: "Hot",
    label: "Hot",
  },
  {
    value: "Past Week",
    label: "Past Week",
  },
  {
    value: "Past Month",
    label: "Past Month",
  },

  {
    value: "Past Year",
    label: "Past Year",
  },
  {
    value: "All Time",
    label: "All Time",
  },
];

export default function Filterbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Hot");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="shadow-none border-none font-semibold hover:bg-transparent cursor-pointer pl-2"
        >
          {value}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-fit p-0 text-center">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {filter.map((f) => (
                <CommandItem
                  key={f.value}
                  value={f.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {f.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === f.value ? "opacity-100" : "opacity-0",
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
