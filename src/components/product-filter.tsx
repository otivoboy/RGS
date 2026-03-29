"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/lib/products-data";
import { ChevronRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const mainCategories = [
  { label: "Mobile Phones", value: "phones" },
  { label: "Laptops", value: "laptops" },
  { label: "Desktop PCs", value: "pcs" },
  { label: "Tablets", value: "tablets" },
  { label: "Monitors", value: "monitors" },
  { label: "Printers & Toners", value: "printers" },
  { label: "Home Appliances", value: "appliances" },
  { label: "Accessories", value: "accessories" },
];

export default function ProductFilter({
  products,
  onFilterChange,
}: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  
  // Calculate dynamic max price from products
  const absoluteMaxPrice = useMemo(() => {
    if (products.length === 0) return 500000;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 1000) * 1000;
  }, [products]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, absoluteMaxPrice]);

  // Dynamically extract brands for each category
  const categoryBrands = useMemo(() => {
    const mapping: Record<string, string[]> = {};
    products.forEach((p) => {
      if (!mapping[p.category]) {
        mapping[p.category] = [];
      }
      if (!mapping[p.category].includes(p.brand)) {
        mapping[p.category].push(p.brand);
      }
    });
    // Sort brands alphabetically
    Object.keys(mapping).forEach(cat => {
        mapping[cat].sort();
    });
    return mapping;
  }, [products]);

  // Sync price range if absoluteMaxPrice changes significantly (initial load)
  useEffect(() => {
    setPriceRange([0, absoluteMaxPrice]);
  }, [absoluteMaxPrice]);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    onFilterChange(filtered);
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, products, onFilterChange]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedBrand(null);
    setPriceRange([0, absoluteMaxPrice]);
  };

  const handleBrandSelect = (categoryValue: string, brand: string) => {
    setSelectedCategory(categoryValue);
    setSelectedBrand(brand === selectedBrand ? null : brand);
  };

  return (
    <div className="space-y-10">
      {/* Search Filter */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b-2 border-primary/10 pb-2">Search Products</h3>
        <div className="relative">
          <Input
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold border-b-2 border-primary/10 pb-2">Filter Products By Price</h3>
        <div className="px-2">
          <Slider
            min={0}
            max={absoluteMaxPrice}
            step={1000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary"
          />
          <div className="mt-4 flex flex-col gap-4">
            <div className="text-sm font-medium text-gray-500">
              Price: <span className="text-gray-900 font-bold">KSh {priceRange[0].toLocaleString()} — KSh {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter with Brand Sub-listing */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold border-b-2 border-primary/10 pb-2">Filter Products By Categories</h3>
        <Accordion type="single" collapsible className="w-full border rounded-md overflow-hidden bg-white shadow-sm">
          {mainCategories.map((cat) => (
            <AccordionItem key={cat.value} value={cat.value} className="border-b last:border-b-0">
              <AccordionTrigger 
                className={`px-4 py-3 hover:no-underline hover:bg-gray-50 transition-colors ${
                    selectedCategory === cat.value ? "text-primary bg-primary/5" : "text-gray-700"
                }`}
                onClick={(e) => {
                    // Only toggle category if clicking the trigger itself, not nested buttons
                    if (selectedCategory !== cat.value) {
                        setSelectedCategory(cat.value);
                        setSelectedBrand(null);
                    }
                }}
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  {cat.label}
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50/50 pb-2">
                <div className="flex flex-col space-y-1 mt-1">
                  <button
                    onClick={() => {
                        setSelectedCategory(cat.value);
                        setSelectedBrand(null);
                    }}
                    className={`flex items-center gap-2 px-8 py-2 text-xs transition-colors hover:text-primary text-left w-full ${
                      selectedCategory === cat.value && !selectedBrand ? "text-primary font-bold" : "text-gray-500"
                    }`}
                  >
                    <ChevronRight className="w-3 h-3" />
                    All {cat.label}
                  </button>
                  {categoryBrands[cat.value]?.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandSelect(cat.value, brand)}
                      className={`flex items-center gap-2 px-8 py-2 text-xs transition-colors hover:text-primary text-left w-full ${
                        selectedBrand === brand ? "text-primary font-bold" : "text-gray-500"
                      }`}
                    >
                      <ChevronRight className="w-3 h-3" />
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Reset Button */}
      {(searchTerm || selectedCategory || selectedBrand || priceRange[0] > 0 || priceRange[1] < absoluteMaxPrice) && (
        <Button 
          onClick={resetFilters} 
          variant="ghost" 
          className="w-full text-xs underline hover:text-primary hover:bg-transparent"
        >
          Reset All Filters
        </Button>
      )}
    </div>
  );
}
