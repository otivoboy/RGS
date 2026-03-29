
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle2, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: 1,
    name: "Ann Chebet",
    rating: 4.8,
    comment:
      "Excellent service! Found the perfect laptop for my work needs. The staff was knowledgeable and helped me choose the right specifications.",
    product: "Dell XPS 13",
    verified: true,
    initials: "AC",
  },
  {
    id: 2,
    name: "Michael Omondi",
    rating: 4.3,
    comment:
      "Great prices and fast service. Bought my iPhone here and got a better deal than anywhere else. Highly recommend!",
    product: "iPhone 16 Pro Max",
    verified: true,
    initials: "MO",
  },
  {
    id: 3,
    name: "Emily Wanja",
    rating: 5,
    comment:
      "The team helped me build a custom gaming PC within my budget. Amazing performance and great customer support throughout the process.",
    product: "Custom Gaming PC",
    verified: true,
    initials: "EA",
  },
  {
    id: 4,
    name: "Dannis Kimani",
    rating: 4,
    comment:
      "Professional service and quality products. The warranty support has been excellent when I needed it.",
    product: "Samsung Galaxy S25 Ultra",
    verified: true,
    initials: "DN",
  },
  {
    id: 5,
    name: "Grace Nekesa",
    rating: 5,
    comment:
      "Amazing service and country-wide delivery was super fast! Got my new phone in perfect condition.",
    product: "Samsung Galaxy S24 FE",
    verified: true,
    initials: "GA",
  },
  {
    id: 6,
    name: "Peter Gitau",
    rating: 4,
    comment:
      "The staff at Rwathia Gadget Store are very helpful. Found exactly what I needed for my home.",
    product: "LG Front Load Washer",
    verified: true,
    initials: "PK",
  },
];

export default function Testimonials() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-green-600">Customer Feedback</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-headline leading-tight">
              Real Stories from Our Community
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-tighter">4.5/5 Based on 2,500+ Reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-white/60 dark:bg-gray-800/40 border-none shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white font-headline leading-none mb-1">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[10px] font-bold px-2 py-0.5 flex items-center gap-1 uppercase tracking-tighter">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-amber-400 fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic text-[15px] md:text-base">
                  "{testimonial.comment}"
                </blockquote>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5">Purchased</p>
                    <p className="text-sm font-bold text-primary group-hover:underline cursor-pointer">
                      {testimonial.product}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-6">Join over 15,000 happy gadget owners across Kenya.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-background bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="flex items-center justify-center h-10 w-10 rounded-full ring-4 ring-background bg-primary text-white text-[10px] font-bold">
                +2k
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
