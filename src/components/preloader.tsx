
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const logo = PlaceHolderImages.find(p => p.id === 'logo-preloader');

  useEffect(() => {
    // Function to hide preloader
    const handleLoadComplete = () => {
      // Small delay after load to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    // Check if the page is already loaded (common on fast connections or refreshes)
    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      // Wait for the full window load event (images, videos metadata, etc.)
      window.addEventListener('load', handleLoadComplete);
      
      // Safety fallback: if for some reason the load event doesn't fire, 
      // don't leave the user stuck on the preloader forever.
      const fallback = setTimeout(handleLoadComplete, 3000);

      return () => {
        window.removeEventListener('load', handleLoadComplete);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out">
      <div className="relative w-32 h-32 md:w-48 md:h-48 flex flex-col items-center justify-center">
        {logo?.imageUrl && (
          <div className="relative w-full h-full animate-pulse">
            <Image
              src={logo.imageUrl}
              alt="Rwathia Gadget Store"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(43,89,255,0.5)]"
              priority
              data-ai-hint={logo?.imageHint}
            />
          </div>
        )}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}