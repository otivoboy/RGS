"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import ProductFilter from "@/components/product-filter";
import { shuffledProducts as allProducts } from "@/lib/products-data";
import { Product } from "@/lib/products-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  
  const heroImage = PlaceHolderImages.find(p => p.id === 'ad-full-mega-sale');
  const laptopTile = PlaceHolderImages.find(p => p.id === 'gallery-laptop-section');
  const macbookTile = PlaceHolderImages.find(p => p.id === 'gallery-macbook-display');
  const iphoneTile = PlaceHolderImages.find(p => p.id === 'gallery-iphone-display');

  // Handle local mobile search if not using the sidebar
  useEffect(() => {
    if (mobileSearchTerm) {
      const term = mobileSearchTerm.toLowerCase();
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [mobileSearchTerm]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-[1440px] py-4 md:py-10">
        
        {/* Mobile Search Bar - Only visible on mobile */}
        <div className="lg:hidden mb-6">
          <div className="relative">
            <Input
              placeholder="Search products..."
              value={mobileSearchTerm}
              onChange={(e) => setMobileSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-primary focus:border-primary shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Mobile-Friendly Hero Section */}
        <div className="mb-6 md:mb-10">
          <div className="relative aspect-[21/9] md:aspect-[3/1] rounded-xl overflow-hidden shadow-md">
            <Image
              src={heroImage?.imageUrl || ''}
              alt="Promotional Banner"
              fill
              className="object-cover"
              data-ai-hint={heroImage?.imageHint}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* Category Tiles Section */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
          {[
            { img: laptopTile, label: "HP Laptops" },
            { img: macbookTile, label: "Macbooks" },
            { img: iphoneTile, label: "iPhones" }
          ].map((tile, i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-100 shadow-sm cursor-pointer">
              <Image
                src={tile.img?.imageUrl || ''}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={tile.img?.imageHint}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[10px] md:text-xs font-bold py-1 px-2 text-center uppercase">
                {tile.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Desktop Only Sticky */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0 lg:sticky lg:top-24 lg:h-fit self-start">
            <ProductFilter products={allProducts} onFilterChange={setFilteredProducts} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* "OUR WEEKLY OFFERS" Badge */}
            <div className="mb-6">
              <span className="inline-block bg-black text-white text-xs md:text-sm font-bold px-6 py-2.5 rounded-r-xl uppercase tracking-widest shadow-lg">
                Our Weekly Offers
              </span>
            </div>

            {/* Products Grid - 2 columns on mobile */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No products found.</p>
                <button onClick={() => window.location.reload()} className="text-primary hover:underline text-sm mt-2">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-8 md:gap-x-6 md:gap-y-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product as Product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
