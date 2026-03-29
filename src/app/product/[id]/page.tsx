"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Mail,
  MessageCircle,
  ArrowLeft,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";
import { products } from "@/lib/products-data";
import Link from "next/link";
import PaymentButtons from "@/components/payment-buttons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import RelatedProducts from "@/components/related-products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const product = products.find((p) => p.id === id);
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'placeholder-svg');

  if (!product) {
    notFound();
  }

  const addToCart = async () => {
    setIsAddingToCart(true);

    try {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProductIndex = existingCart.findIndex(
        (item: any) => item.id === product.id
      );

      if (existingProductIndex > -1) {
        existingCart[existingProductIndex].quantity += quantity;
      } else {
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity: quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } finally {
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 500);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${
      product.name
    } priced at KSh ${product.price.toLocaleString()}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/254729462462?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmail = () => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in the ${
      product.name
    } priced at KSh ${product.price.toLocaleString()}. Can you provide more details?\n\nThank you.`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@rwathiagadgetstore.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const totalPrice = product.price * quantity;
  const totalSavings = product.originalPrice
    ? (product.originalPrice - product.price) * quantity
    : 0;

  const whyChoosePoints = [
    {
        title: "Authentic & Brand New",
        description: `This ${product.name} is a 100% genuine product, sourced directly from authorized distributors. It comes sealed in its original packaging with all standard accessories included.`
    },
    {
        title: "Full Manufacturer Warranty",
        description: `Enjoy complete peace of mind with a full manufacturer's warranty. We are an authorized retailer, ensuring your warranty is valid for any service needs.`
    },
    {
        title: "Competitive Pricing & Value",
        description: `We offer the best possible price for the ${product.name} in the market, providing excellent value for a high-quality, authentic device. Free delivery available!`
    },
    {
        title: "Expert Customer Support",
        description: `Our knowledgeable team is here to assist you with any questions before and after your purchase. We provide setup assistance and technical support to ensure a smooth experience.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-[1440px] px-4 py-8">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="p-4 sm:p-8">
            <div className="mb-6">
              <Button asChild variant="outline" size="sm">
                <Link href="/products" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Products
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-sm border border-border">
                  <Image
                    src={product.image || placeholderImage?.imageUrl || ''}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    priority
                  />
                  {discountPercentage > 0 && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive" className="text-lg px-3 py-1 font-bold">
                        -{discountPercentage}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-2 uppercase tracking-widest text-[10px] font-bold">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 font-headline">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-2">
                    {product.originalPrice ? (
                      <>
                        <span className="text-gray-400 line-through text-xl">
                          KSh {product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-3xl font-black text-destructive">
                          KSh {product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-black text-primary">
                        KSh {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {discountPercentage > 0 && (
                    <p className="text-green-600 font-bold animate-pulse">
                      You save KSh{" "}
                      {(
                        (product.originalPrice || 0) - product.price
                      ).toLocaleString()}{" "}
                      per item!
                    </p>
                  )}

                  <p className="text-sm text-green-600 font-semibold mt-4 flex items-center gap-2">
                    <span className="bg-green-100 p-1 rounded-full">🚚</span>
                    Country Wide Delivery Available
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold mb-2 font-headline">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>

                {product.specs && product.specs.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold mb-2 font-headline">Specifications</h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside text-sm">
                      {product.specs.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3 border-t pt-6">
                  <h3 className="text-lg font-bold font-headline">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-md border p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {quantity > 1 && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Total: <span className="font-bold">KSh {totalPrice.toLocaleString()}</span></p>
                        {totalSavings > 0 && (
                          <p className="text-green-600">
                            Savings: KSh {totalSavings.toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <Button
                    onClick={addToCart}
                    disabled={isAddingToCart}
                    className="w-full flex items-center gap-2 py-6 text-lg font-bold shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAddingToCart
                      ? "Adding to Cart..."
                      : `Add ${quantity} to Cart`}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleWhatsApp}
                      variant="outline"
                      className="flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={handleEmail}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold mb-4 font-headline">
                    Buy Now - Quick M-Pesa Payment
                  </h3>
                  <PaymentButtons
                    amount={totalPrice}
                    productName={`${quantity}x ${product.name}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mt-12 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-lg p-6 lg:p-8 border border-border">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 font-headline">Why Choose the {product.name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyChoosePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/80 dark:bg-gray-700/50 shadow-sm border border-border/50">
                        <CheckCircle className="w-8 h-8 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg mb-1 font-headline">{point.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{point.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
}
