"use client";

import { Eye, EyeClosed, Sparkle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <section className="flex-1 relative">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkle size={16} className="text-muted-foreground" />
              <EyeClosed size={32} className="mt-2 text-black" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent font-nunito">
                Nazars
              </h1>
              <Eye size={32} className="mt-2 text-black" />
              <Sparkles size={16} className="text-muted-foreground" />
            </div>
            <Balancer
              ratio={0.65}
              className="text-lg md:text-xl text-gray-600 mb-8  mx-auto"
            >
              Watch and monitor how youtube video titles and thumbnails change
              over time.
            </Balancer>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="relative flex items-center justify-center">
          {/* Central Person - Main floating element */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/person.svg"
              alt="Person illustration"
              width={350}
              height={350}
              className="drop-shadow-lg"
            />
          </motion.div>

          {/* Floating Element 1 - Top Left */}
          <motion.div
            className="absolute top-8 left-8"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              // rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Image
              src="/floating1.svg"
              alt="Floating element 1"
              width={80}
              height={80}
            />
          </motion.div>

          {/* Floating Element 2 - Top Right */}
          <motion.div
            className="absolute top-2 right-12"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              rotate: [0, 8, -3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Image
              src="/floating2.svg"
              alt="Floating element 2"
              width={70}
              height={70}
            />
          </motion.div>

          {/* Floating Element 3 - Middle Left */}
          <motion.div
            className="absolute right-30 top-30 "
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, -10, 5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <Image
              src="/floating3.svg"
              alt="Floating element 3"
              width={90}
              height={90}
            />
          </motion.div>

          {/* Floating Element 4 - Middle Right */}
          <motion.div
            className="absolute right-8 top-50"
            animate={{
              y: [0, 20, 0],
              x: [0, -25, 0],
              rotate: [0, 12, -8, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Image
              src="/floating4.svg"
              alt="Floating element 4"
              width={85}
              height={85}
            />
          </motion.div>

          {/* Floating Element 5 - Bottom Left */}
          <motion.div
            className="absolute bottom-8 left-16"
            animate={{
              y: [0, -18, 0],
              x: [0, 12, 0],
              rotate: [0, -6, 4, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2.5,
            }}
          >
            <Image
              src="/floating5.svg"
              alt="Floating element 5"
              width={75}
              height={75}
            />
          </motion.div>

          {/* Floating Element 6 - Bottom Right */}
          <motion.div
            className="absolute bottom-12 right-40"
            animate={{
              y: [0, 22, 0],
              x: [0, -18, 0],
              rotate: [0, 15, -12, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <Image
              src="/floating6.svg"
              alt="Floating element 6"
              width={65}
              height={65}
            />
          </motion.div>

          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 rounded-full blur-3xl -z-10" />
        </div>
      </section>
    </div>
  );
}
