"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Lightbulb, 
  Star,
  MapPin,
  ShoppingBag,
  MessageCircle,
  Tag,
  Wrench,
  Megaphone,
  Search,
  Mail,
  Zap
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { blogPosts } from "@/lib/blogs-data";

export default function BlogsPage() {
  // Filter posts for specific sections
  const latestPosts = blogPosts.filter(p => ['laptop-upgrade-signs-2026', 'refurbished-vs-new-guide', 'extend-battery-life-tips'].includes(p.slug));
  const techTips = blogPosts.filter(p => ['new-device-setup-guide', 'remote-work-accessories-2026', 'warranty-after-sales-support-guide'].includes(p.slug));
  const featuredPost = blogPosts.find(p => p.slug === 'smartphone-buying-guide-2026');

  const categories = [
    "Smartphones", "Laptops & PCs", "Home Appliances", "Accessories",
    "Buying Guides", "Performance Tips", "Smart Home Setup", "Audio Gear",
    "Camera Reviews", "Student Laptops", "Energy Efficiency", "Charging Tips",
    "OS Updates", "Business Devices", "Maintenance Guides", "Cases & Protection"
  ];

  const tags = [
    "SmartphoneGuide", "LaptopTips", "TechSupport", "BudgetDevices", 
    "CountrywideDelivery", "NewArrivals", "BatteryLife", "Refurbished", 
    "GadgetReviews", "HowTo"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header with Background Image */}
      <header className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/blog-header-bg.png"
            alt="Insights Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto max-w-[1440px] px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-headline text-white">
            Tech News • Tips & Guides • Product Updates
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Your source for the latest in technology, buying advice, and behind-the-scenes stories from our team.
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-[1440px] px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Featured Article */}
            {featuredPost && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold font-headline">Featured Article</h2>
                </div>
                <Card className="overflow-hidden border-none shadow-xl bg-white/50 dark:bg-gray-800/50 group">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                      <Image
                        src={PlaceHolderImages.find(img => img.id === featuredPost.image)?.imageUrl || "/assets/placeholder.jpg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <Badge variant="secondary">{featuredPost.category}</Badge>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 font-headline leading-tight group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mb-8">
                        <div>
                          <p className="text-xs text-gray-500">{featuredPost.date}</p>
                        </div>
                      </div>
                      <Button asChild className="w-fit rounded-full px-8">
                        <Link href={`/blogs/${featuredPost.slug}`} className="flex items-center gap-2">Read Full Article <ArrowRight className="w-4 h-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Latest Posts */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-headline">Latest Posts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestPosts.map((post, idx) => (
                  <Card key={idx} className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 hover:shadow-lg transition-all flex flex-col group">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={PlaceHolderImages.find(img => img.id === post.image)?.imageUrl || "/assets/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg font-headline leading-snug hover:text-primary transition-colors">
                        <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                      <Link href={`/blogs/${post.slug}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        Read More <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tech Tips & How-Tos */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-headline">Tech Tips & How-Tos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {techTips.map((post, idx) => (
                  <Card key={idx} className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 hover:shadow-lg transition-all flex flex-col group">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={PlaceHolderImages.find(img => img.id === post.image)?.imageUrl || "/assets/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg font-headline leading-snug hover:text-primary transition-colors">
                        <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                      <Link href={`/blogs/${post.slug}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        Read More <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Product Spotlight */}
            <section className="bg-primary/5 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Megaphone className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Product Spotlight</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6 font-headline">Meet the New Arrivals: March 2026 Edition</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    We're constantly updating our selection with the latest and most reliable devices. This month, we're excited to introduce a new lineup of smart home gadgets, powerful budget laptops, and premium audio gear.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Noise-canceling headphones under KSh 13,000",
                      "Lightweight laptop with all-day battery",
                      "Smart plugs and home automation starters"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link href={`/blogs/new-arrivals-march-2026`}>Read More About Arrivals</Link>
                  </Button>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={PlaceHolderImages.find(img => img.id === 'blog-new-arrivals-march')?.imageUrl || "/assets/placeholder.jpg"}
                    alt="New Arrivals"
                    fill
                    className="object-cover"
                    data-ai-hint="tech gadgets"
                  />
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-10">
            
            {/* Newsletter */}
            <Card className="bg-primary text-white border-none shadow-xl p-8 rounded-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-6 h-6" />
                <h3 className="text-2xl font-bold font-headline">Get Tech Tips Delivered</h3>
              </div>
              <p className="text-blue-100 mb-6 text-sm">
                Stay updated with the latest articles, exclusive deals, and product announcements. No spam—just useful content.
              </p>
              <p className="text-xs font-bold text-amber-300 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Free Guide: "10 Things to Do After Buying a New Device"
              </p>
              <div className="space-y-3">
                <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">Subscribe Now</Button>
              </div>
            </Card>

            {/* Quick Tips */}
            <section className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-primary/10">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-headline">Quick Tips</h3>
              </div>
              <div className="space-y-6">
                {[
                  { title: "Update regularly", text: "Those notifications often include critical security patches that keep your data safe." },
                  { title: "Use a surge protector", text: "Power fluctuations can damage sensitive electronics. It's a small investment for protection." },
                  { title: "Back up your data", text: "Whether cloud or external drive, having a backup saves you if something goes wrong." }
                ].map((tip, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                      <span className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-[10px]">#{i+1}</span>
                      {tip.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                <Search className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-headline">Browse By Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <Link key={i} href="#" className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular Tags */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-headline">Popular Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <Link key={i} href="#" className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                    <Tag className="w-3 h-3" /> #{tag}
                  </Link>
                ))}
              </div>
            </section>

            {/* Reader Testimonials */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <h3 className="text-xl font-bold font-headline">Reader Reviews</h3>
              </div>
              <div className="space-y-4">
                {[
                  { text: "I found the smartphone buying guide incredibly helpful. It helped me choose the perfect phone for my needs without overspending.", author: "David K." },
                  { text: "The refurbished vs new article answered all my questions. I ended up buying a refurbished laptop from Rwathia and it's been flawless.", author: "Sarah M." }
                ].map((testimonial, i) => (
                  <Card key={i} className="bg-white/30 dark:bg-black/20 border-none p-4 italic">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">"{testimonial.text}"</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">— {testimonial.author}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Connect Card */}
            <Card className="bg-gray-900 text-white p-6 rounded-2xl border-none">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold font-headline">Connect With Us</h3>
              </div>
              <div className="space-y-4">
                <Link href="/contact" className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-bold">Visit our store</p>
                    <p className="text-xs text-gray-400">See devices in person and chat with our team</p>
                  </div>
                </Link>
                <Link href="/products" className="flex items-start gap-3 group">
                  <ShoppingBag className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-bold">Shop online</p>
                    <p className="text-xs text-gray-400">Countrywide delivery available across Kenya</p>
                  </div>
                </Link>
                <Link href="https://wa.me/254729462462" className="flex items-start gap-3 group">
                  <MessageCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-bold">Contact support</p>
                    <p className="text-xs text-gray-400">We're here to help with any questions</p>
                  </div>
                </Link>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Have a Topic?</p>
                <Button variant="outline" className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800 text-xs">
                  Suggest a Topic
                </Button>
              </div>
            </Card>

          </aside>
        </div>
      </main>
    </div>
  );
}
