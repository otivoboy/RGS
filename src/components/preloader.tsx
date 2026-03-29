
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const logo = PlaceHolderImages.find(p => p.id === 'logo-preloader');


  useEffect(() => {
    // This effect runs only once when the component mounts for the first time.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // A brief delay for the initial load feel

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-500">
      <div className="relative w-32 h-32 animate-pulse">
        {logo?.imageUrl && (
          <Image
            src={logo.imageUrl}
            alt="Rwathia Gadget Store Logo"
            fill
            className="object-contain drop-shadow-lg"
            priority
            data-ai-hint={logo?.imageHint}
          />
        )}
      </div>
    </div>
  );
}
