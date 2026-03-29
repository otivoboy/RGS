"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6904H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z" fill="currentColor"/></svg>
)


export default function Footer() {
  const footerLogo = PlaceHolderImages.find(p => p.id === 'logo-footer');
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

  const quickLinks = [{ href: "/terms", label: "Terms & Conditions" }];

  const categories = [
    { href: "/products?category=phones", label: "Mobile Phones" },
    { href: "/products?category=laptops", label: "Laptops" },
    { href: "/products?category=pcs", label: "Desktop PCs" },
    { href: "/products?category=appliances", label: "Home Appliances" },
    { href: "/products?category=accessories", label: "Accessories" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/rwathiagadgetstore", label: "Facebook" },
    { icon: XIcon, href: "https://x.com/rwathiagadgets", label: "X (Twitter)" },
    { icon: Instagram, href: "https://instagram.com/rwathiagadgetstore", label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-[1440px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                {footerLogo?.imageUrl && (
                  <Image
                    src={footerLogo.imageUrl}
                    alt="RGS Logo"
                    fill
                    className="object-contain rounded-lg"
                    data-ai-hint={footerLogo?.imageHint}
                  />
                )}
              </div>
              <span className="text-xl font-bold text-blue-400 font-headline leading-tight">
                Rwathia Gadget Store
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Where Quality Meets Affordability. Your trusted partner for all
              technology needs with country wide delivery.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4 font-headline text-white/90">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4 font-headline text-white/90">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4 font-headline text-white/90">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>HH Towers, Moi Avenue</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+254729462462"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  +254 729 462 462
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:info@rwathiagadgetstore.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium break-all"
                >
                  info@rwathiagadgetstore.com
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold font-headline text-sm">Store Hours</h4>
                {storeStatus && (
                  <Badge variant={storeStatus.isOpen ? "default" : "destructive"} className="text-[10px] h-5 px-2">
                    {storeStatus.text}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-400 space-y-1.5">
                <p className="flex justify-between"><span>Mon-Fri:</span> <span>8:00 AM - 8:00 PM</span></p>
                <p className="flex justify-between"><span>Saturday:</span> <span>8:00 AM - 9:00 PM</span></p>
                <p className="flex justify-between"><span>Sunday:</span> <span>10:00 AM - 3:00 PM</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Rwathia Gadget Store. All rights reserved. |
            <Link href="/terms" className="hover:text-white ml-1 underline underline-offset-2">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
