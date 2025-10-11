"use client";

import { WordRotate } from "@/components/ui/word-rotate";

export default function Hero() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center px-8 pb-4 flex-grow">
      {/* Top Text */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-32 lg:gap-70 mb-4 text-center">
        <h2 className="text-muted-foreground text-sm sm:text-base md:text-xl font-raleway font-medium tracking-wide">
          Organize your reads
        </h2>
        <h2 className="text-muted-foreground text-sm sm:text-base md:text-xl font-raleway font-medium tracking-wide">
          Share your discoveries
        </h2>
      </div>

      {/* Main Logo */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-foreground text-6xl md:text-8xl lg:text-9xl font-raleway font-bold tracking-[0.07em] mb-8 leading-none">
          <span className="tracking-[-0.1em]">D</span>
          <span className="tracking-wider">.</span>LIBRARY
        </h1>

        {/* Bottom Text */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-38 text-accent-foreground">
          <span className="text-lg md:text-xl font-raleway font-semibold tracking-widest">
            <WordRotate
              words={["DIGITAL", "DYNAMIC", "READING"]}
              duration={3000}
            />
          </span>
          <span className="text-lg md:text-xl font-raleway font-semibold tracking-widest">
            <WordRotate
              words={["DISCOVER", "EXPLORE ", "INSPIRE "]}
              duration={3000}
            />
          </span>
          <span className="text-lg md:text-xl font-raleway font-semibold tracking-widest">
            <WordRotate
              words={["DEVELOPMENT", "INNOVATION ", "CREATION   "]}
              duration={3000}
            />
          </span>
        </div>
      </div>
    </main>
  );
}
