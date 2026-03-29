"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const ads = [
  {
    id: 1,
    image: PlaceHolderImages.find(p => p.id === 'ad-full-mega-sale'),
    title: " Mega Sale – Up to 40% OFF",
    subtitle: "On all Smartphones, Laptops & Accessories",
    cta: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    image: PlaceHolderImages.find(p => p.id === 'ad-full-new-laptops'),
    title: " Latest Laptops Available",
    subtitle: "MacBook Pro, Dell XPS & HP Spectre - Free Delivery + Warranty",
    cta: "View Laptops",
    link: "/products?category=laptops",
  },
  {
    id: 3,
    image: PlaceHolderImages.find(p => p.id === 'ad-full-smartphone-deals'),
    title: " iPhone 17 & Galaxy S26 Ultra",
    subtitle: "Be the first to own the future of mobile technology",
    cta: "View Phones",
    link: "/products?category=phones",
  },
  {
    id: 4,
    image: PlaceHolderImages.find(p => p.id === 'ad-full-home-appliances'),
    title: " Home Appliances Sale",
    subtitle: "Kitchen appliances, washers, vacuums & more - Country wide delivery",
    cta: "Shop Appliances",
    link: "/products?category=appliances",
  },
  {
    id: 5,
    image: PlaceHolderImages.find(p => p.id === 'ad-full-gaming-accessories'),
    title: "Gaming & Accessories",
    subtitle: "Nintendo Switch 2, Gaming PCs, Keyboards & More",
    cta: "View Gaming",
    link: "/products?category=accessories",
  },
];

export default function FullFeatureAds() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-headline">
            Featured Deals & Offers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Don't miss out on these amazing deals
          </p>
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto">
          <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
            {ads.map((ad, index) => (
              <div
                key={ad.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === current
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={ad.image?.imageUrl || ''}
                  alt={ad.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={ad.image?.imageHint}
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                  <div className="max-w-4xl">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl font-headline">
                      {ad.title}
                    </h3>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95 drop-shadow-lg">
                      {ad.subtitle}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-xl"
                    >
                      <Link href={ad.link}>{ad.cta}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {ads.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
