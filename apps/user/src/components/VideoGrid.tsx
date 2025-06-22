import { Eye, Pin, Target } from "lucide-react";
import { Card } from "./ui/card";
import Image from "next/image";

export default function VideoGrid() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-16">
        {Array.from({ length: 24 }).map((_, i) => {
          return (
            <Card
              key={i}
              className="mx-auto px-4 border-none shadow-none gap-2 max-w-md "
            >
              <div className="relative group cursor-pointer">
                <Image
                  src={"https://i.ytimg.com/vi/gNc9eQJUR6c/hqdefault.jpg"}
                  alt="Mountains"
                  quality={100}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                  width={480}
                  height={360}
                  className=" bg-amber-300 rounded-md"
                />

                <div className="bg-black rounded-xl group-hover:opacity-50 absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200" />

                <Pin
                  size={20}
                  className=" absolute top-4 right-4 opacity-0 group-hover:opacity-100 cursor-pointer text-white fill-none transition-opacity duration-200"
                />

                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 w-full p-2 h-[72px] rounded-b-full transition-opacity duration-200 text-white">
                  <h1 className=" text-xl font-black">
                    Something happened in the title!
                  </h1>
                </div>
              </div>

              <div className="flex items-center">
                <h1 className="ml-1 font-nunito text-sm text-muted-foreground">
                  FNATIC Valorant
                </h1>
                <div className="ml-auto flex items-center gap-4 text-muted-foreground">
                  <h1 className="flex items-center gap-1">
                    <Target size={14} />
                    <span className="text-xs">455.1k</span>
                  </h1>
                  <h1 className="flex items-center gap-0.5">
                    <Eye size={14} />
                    <span className="text-xs">2.8k</span>
                  </h1>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
