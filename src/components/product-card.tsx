"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const productImage = PlaceHolderImages.find(p => p.id === `product-${product.id}`);
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'placeholder-svg');

  // Format price display range
  const priceRange = product.price < 50000 ? "0-50k" : product.price < 100000 ? "50-100k" : "Above 100k";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = existingCart.findIndex((item: any) => item.id === product.id);

    if (existingProductIndex > -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  return (
    <div className="relative h-full">
      <Link href={`/product/${product.id}`} className="group block h-full">
        <div className="bg-white rounded-lg flex flex-col h-full border-b md:border-none pb-4 md:pb-0 relative">
          {/* Category/Price Meta Text */}
          <div className="mb-1">
            <p className="text-[10px] md:text-[11px] text-gray-400 font-medium capitalize line-clamp-1">
              {priceRange}, {product.brand}, {product.category}
            </p>
          </div>

          {/* Title */}
          <h3 className="text-[13px] md:text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-3 min-h-[36px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Image Area */}
          <div className="relative aspect-[4/5] bg-white rounded-md overflow-hidden mb-4 flex items-center justify-center">
            <Image
              src={productImage?.imageUrl || placeholderImage?.imageUrl || ''}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              data-ai-hint={productImage?.imageHint}
            />
          </div>

          {/* Pricing & Actions Area */}
          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[15px] md:text-lg font-black text-[#FF0000]">
                KSh {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] md:text-[11px] text-gray-400 line-through">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quick Add to Cart Button */}
            <Button
              size="icon"
              variant="outline"
              onClick={handleAddToCart}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          {/* Subtle vertical divider for mobile grid */}
          <div className="md:hidden absolute -right-1 top-0 bottom-0 w-[1px] bg-gray-100" />
        </div>
      </Link>
    </div>
  );
}
