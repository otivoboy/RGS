"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function WhatsAppFloat() {
  const phoneNumber = "254729462462";
  const message = "Hello! I'm interested in your products. Please help me with more details.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const whatsappLogo = PlaceHolderImages.find(p => p.id === 'whatsapp-icon');

  return (
    <div className="fixed bottom-6 left-4 md:left-auto md:right-10 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-2 bg-[#4CAF50] text-white px-4 py-2.5 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95",
          "font-bold text-sm md:text-base tracking-tight"
        )}
      >
        <div className="relative w-6 h-6 flex-shrink-0">
          <Image
            src={whatsappLogo?.imageUrl || '/whatsapp.png'}
            alt="WhatsApp"
            fill
            className="object-contain"
            data-ai-hint={whatsappLogo?.imageHint || "whatsapp logo"}
          />
        </div>
        <span>WhatsApp Us 24/7</span>
      </a>
    </div>
  );
}
