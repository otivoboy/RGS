"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const logo = PlaceHolderImages.find((p) => p.id === "logo-preloader");

  useEffect(() => {
    // Artificial progress increment for visual flair
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
    }, 200);

    const handleLoadComplete = () => {
      setProgress(100);
      // Small delay to allow the 100% state to be visible
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };

    // Check if the document is already loaded
    if (document.readyState === "complete") {
      handleLoadComplete();
    } else {
      window.addEventListener("load", handleLoadComplete);
      
      // Safety fallback to prevent users being stuck
      const fallback = setTimeout(handleLoadComplete, 4000);

      return () => {
        window.removeEventListener("load", handleLoadComplete);
        clearTimeout(fallback);
        clearInterval(interval);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-all duration-1000 ease-in-out">
      {/* Futuristic Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative flex flex-col items-center justify-center">
        
        {/* Animated Outer HUD Rings */}
        <div className="absolute w-48 h-48 md:w-64 md:h-64 border-t-2 border-b-2 border-primary/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute w-40 h-40 md:w-56 md:h-56 border-l-2 border-r-2 border-blue-500/20 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
        
        {/* Logo Container */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 z-10 flex items-center justify-center">
          {logo?.imageUrl && (
            <div className="relative w-4/5 h-4/5">
              <Image
                src={logo.imageUrl}
                alt="Rwathia Gadget Store"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse"
                priority
              />
            </div>
          )}
        </div>

        {/* Technical Data Text */}
        <div className="mt-12 text-center z-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-2 font-mono">
            System Initializing...
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-24 bg-gray-800 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 shadow-[0_0_8px_#3b82f6]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-primary font-mono text-sm w-12">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Corner Brackets (Sci-fi Style) */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-primary/20"></div>
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-primary/20"></div>
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-primary/20"></div>
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-primary/20"></div>
    </div>
  );
}
