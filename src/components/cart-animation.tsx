"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";


interface CartAnimationProps {
  product: {
    id: string;
    name: string;
    image: string;
  };
  isVisible: boolean;
  onComplete: () => void;
}

export default function CartAnimation({
  product,
  isVisible,
  onComplete,
}: CartAnimationProps) {
  const [animationStage, setAnimationStage] = useState<
    "start" | "flying" | "complete"
  >("start");
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'placeholder-svg');


  useEffect(() => {
    if (isVisible) {
      setAnimationStage("start");

      // Start flying animation
      setTimeout(() => {
        setAnimationStage("flying");
      }, 100);

      // Complete animation
      setTimeout(() => {
        setAnimationStage("complete");
        onComplete();
      }, 1000);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <div
        className={`absolute transition-all duration-1000 ease-out ${
          animationStage === "start"
            ? "bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 scale-100 opacity-100"
            : animationStage === "flying"
            ? "top-4 right-20 transform scale-50 opacity-80"
            : "top-4 right-16 transform scale-25 opacity-0"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-2 border-2 border-primary">
          <Image
            src={product.image || placeholderImage?.imageUrl || '/'}
            alt={product.name}
            width={60}
            height={60}
            className="object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}
