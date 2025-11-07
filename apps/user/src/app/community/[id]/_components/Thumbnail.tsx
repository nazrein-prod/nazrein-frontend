"use client";

import { useState } from "react";
import { SingleVideoResponse } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function Thumbnail({
  video,
}: {
  video: SingleVideoResponse | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        layoutId="video-thumbnail"
        className="relative aspect-video cursor-pointer overflow-hidden rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={video?.data.thumbnail || "/placeholder.svg"}
          alt={video?.data.title ?? "Video thumbnail"}
          fill
          className="rounded-md object-cover"
          priority
        />
        ;
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              layoutId="video-thumbnail"
              className="fixed inset-0 z-50 mx-auto my-auto aspect-video max-w-4xl p-4"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={video?.data.thumbnail || "/placeholder.svg"}
                alt={video?.data.title ?? "Video thumbnail"}
                fill
                className="rounded-md object-cover"
                priority
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
