
"use client";

import { useMemo } from 'react';
import { shuffledProducts, Product } from '@/lib/products-data';
import ProductCard from './product-card';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const related = useMemo(() => {
    return shuffledProducts
      .filter(p => p.category === category && p.id !== currentProductId)
      .slice(0, 4); // Show up to 4 related products
  }, [category, currentProductId]);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 font-headline">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
    </div>
  );
}

    