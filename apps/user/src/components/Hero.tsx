"use client";

import { Eye, EyeClosed, Sparkle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <div className="flex flex-col w-full">
      <section className="flex-1 relative">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0,
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkle size={16} />
              <EyeClosed size={32} className="mt-2" />
              <h1 className="text-6xl font-bold font-urbanist">Nazars</h1>
              <Eye size={32} className="mt-2" />
              <Sparkles size={16} />
            </div>
            <Balancer
              ratio={0.65}
              className="text-lg md:text-xl  mb-8  mx-auto"
            >
              <motion.p
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  duration: 1.2,
                  bounce: 0,
                }}
              >
                Watch and monitor how youtube video titles and thumbnails change
              </motion.p>
              over time.
            </Balancer>
          </motion.div>
        </div>
      </section>

      {/* <section className="relative py-20 overflow-hidden">
        <div className="relative flex items-center justify-center">
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

          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 rounded-full blur-3xl -z-10" />
        </div>
      </section> */}
    </div>
  );
}
