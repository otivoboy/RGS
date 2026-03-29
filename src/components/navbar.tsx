
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, ShoppingBag, Facebook, Instagram } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6904H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z" fill="currentColor"/></svg>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const logo = PlaceHolderImages.find(p => p.id === 'logo-navbar');

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const totalItems = cart.reduce(
          (sum: number, item: any) => sum + (item.quantity || 0),
          0
        );
        setCartCount(totalItems);
      } catch (e) {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar - Professional Blue */}
      <div className="w-full bg-[#2B59FF] text-white py-2 z-[60] relative">
        <div className="container mx-auto max-w-[1440px] px-4 flex justify-between items-center text-[11px] sm:text-xs md:text-sm font-medium">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HH Towers, Moi Avenue, Nairobi</span>
              <span className="sm:hidden">HH Towers, Nairobi</span>
            </div>
            <div className="text-white/30">|</div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <a href="tel:+254729462462" className="hover:underline font-bold">+254 729 462 462</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com/rwathiagadgetstore" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://x.com/rwathiagadgets" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors" aria-label="X (Twitter)">
              <XIcon className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/rwathiagadgetstore" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-background dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Mobile Menu & Logo Area */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300 md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <Link href="/" className="flex items-center group">
                <div className="relative w-24 h-10 md:w-32 md:h-14">
                  {logo?.imageUrl && (
                    <Image
                      src={logo.imageUrl}
                      alt="Rwathia Gadget Store Logo"
                      fill
                      className="object-contain"
                      priority
                      data-ai-hint={logo?.imageHint}
                    />
                  )}
                </div>
                {/* Desktop Only Title */}
                <span className="hidden md:inline-block ml-3 text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#2B59FF] to-cyan-400 bg-clip-text text-transparent font-headline">
                  Rwathia Gadget Store
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 py-2 group ${
                    isActiveLink(link.href) ? "text-primary dark:text-primary font-bold" : "hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 md:gap-6">
              <Link href="/cart" className="relative p-1 group">
                <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
            <div className="w-3/4 h-full bg-background dark:bg-gray-900 p-6 animate-in slide-in-from-left duration-300" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-headline">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      isActiveLink(link.href)
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
