"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<typeof products>([]);

  useEffect(() => {
    // Get products with discounts
    const discounted = products.filter((p) => p.originalPrice);
    
    // Sort to prioritize latest flagships
    const sorted = [...discounted].sort((a, b) => {
      const priorities = ["samsung-galaxy-s26-ultra", "iphone-17-pro-max", "iphone-16-pro-max", "samsung-galaxy-s25-ultra"];
      const aPriority = priorities.indexOf(a.id);
      const bPriority = priorities.indexOf(b.id);
      
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      return 0;
    });

    // Take top 20 diverse products
    setFeaturedProducts(sorted.slice(0, 20));
  }, []);

  const placeholderImage = PlaceHolderImages.find(p => p.id === 'placeholder-svg');

  return (
    <section className="py-16 bg-background dark:bg-black">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-headline">
            Featured Deals
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Unbeatable offers on the latest Tech, Phones & Home Appliances
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
          {featuredProducts.map((product) => {
            const discountPercentage = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;
              
            const productImage = PlaceHolderImages.find(p => p.id === `product-${product.id}`);

            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer relative h-full group border-none shadow-md bg-white/50 dark:bg-gray-900/50">
                  {discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge
                        variant="destructive"
                        className="font-bold text-[10px] sm:text-xs px-1.5 py-0.5"
                      >
                        -{discountPercentage}%
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-2 sm:p-4 h-full flex flex-col">
                    <div className="aspect-square relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-3 shadow-inner">
                      <Image
                        src={productImage?.imageUrl || placeholderImage?.imageUrl || ''}
                        alt={product.name}
                        fill
                        className="object-contain p-3 transition-all duration-500 group-hover:scale-110"
                        data-ai-hint={productImage?.imageHint}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between text-center">
                      <div>
                        <Badge
                          variant="secondary"
                          className="mb-1.5 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold h-5"
                        >
                          {product.category}
                        </Badge>

                        <h3 className="text-xs sm:text-sm font-bold mb-1.5 line-clamp-2 group-hover:text-primary min-h-[2rem] sm:min-h-[2.5rem] font-headline leading-tight">
                          {product.name}
                        </h3>
                      </div>

                      <div className="mt-auto">
                        {product.originalPrice && (
                          <div className="text-gray-400 line-through text-[10px] sm:text-xs mb-0.5">
                            KSh {product.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-destructive font-black text-sm sm:text-lg mb-1">
                          KSh {product.price.toLocaleString()}
                        </div>

                        {product.originalPrice && (
                          <p className="text-green-600 font-bold text-[10px] sm:text-xs animate-pulse">
                            Save KSh{" "}
                            {(
                              product.originalPrice - product.price
                            ).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products">
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/20">
              View All Professional Gear
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
