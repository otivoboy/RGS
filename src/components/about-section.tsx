
"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award } from "lucide-react";

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        // Silently handle autoplay block
      });
    }
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "All products come with full warranty and quality assurance",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our knowledgeable team provides personalized recommendations",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive pricing with regular deals and discounts",
    },
  ];

  return (
    <section className="py-16 bg-background dark:bg-black">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-headline">
              Why Choose Rwathia Gadget Store?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              With over 8 years of experience in the technology retail
              industry, we've built our reputation on providing quality
              products, competitive prices, and exceptional customer service.
              Our team of experts is here to help you find the perfect device
              for your needs, with country wide delivery available.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 font-headline">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden relative shadow-lg bg-gray-900">
              <CardContent className="p-0 relative">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <video
                    ref={videoRef}
                    id="about-video"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      isVideoPlaying ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: "scale(1.1)", 
                      transformOrigin: "center center",
                    }}
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="auto"
                    onPlaying={() => setIsVideoPlaying(true)}
                  >
                    <source src="/video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white drop-shadow-lg p-4">
                      <h3 className="text-2xl font-bold mb-2 font-headline">
                        Rwathia Gadget Store
                      </h3>
                      <p className="text-lg">Your Technology Partner</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
