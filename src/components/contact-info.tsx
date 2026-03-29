"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  const [storeStatus, setStoreStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const time = now.getHours() * 60 + now.getMinutes();
      let open, close;
      
      if (day >= 1 && day <= 5) { // Mon-Fri
        open = 8 * 60; close = 20 * 60;
      } else if (day === 6) { // Saturday
        open = 8 * 60; close = 21 * 60;
      } else { // Sunday
        open = 10 * 60; close = 15 * 60;
      }
      
      const isOpen = time >= open && time < close;
      setStoreStatus({ isOpen, text: isOpen ? "Opened" : "Closed" });
    };
    
    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["HH Towers, Moi Avenue", "Nairobi, Kenya", "Country Wide Delivery"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+254 729 462 462", "Mon-Fri: 8AM-8PM", "Sat: 8AM-9PM", "Sun: 10AM-3PM"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@rwathiagadgetstore.com",
        "support@rwathiagadgetstore.com",
        "Quick response guaranteed",
      ],
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: [
        "Monday - Friday: 8AM - 8PM",
        "Saturday: 8AM - 9PM",
        "Sunday: 10AM - 3PM",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-headline">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Visit us today or contact us for any questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((contact, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <contact.icon className="w-6 h-6 text-primary" />
                  {contact.title === "Store Hours" && storeStatus && (
                    <div className="absolute -top-2 -right-2">
                       <Badge variant={storeStatus.isOpen ? "default" : "destructive"} className="text-[10px] px-1.5 py-0">
                        {storeStatus.text}
                      </Badge>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3 font-headline">{contact.title}</h3>
                <div className="space-y-1">
                  {contact.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 dark:text-gray-400 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
