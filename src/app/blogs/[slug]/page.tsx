import { blogPosts } from "@/lib/blogs-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  ShoppingBag, 
  MessageCircle,
  TrendingUp,
  Tag
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((p) => p.id === post.image);
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Hero with Title Background */}
      <header className="relative py-20 md:py-32 overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.titleBg}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto max-w-[1440px] px-4 relative z-10">
          <Button asChild variant="ghost" size="sm" className="mb-8 text-white hover:bg-white/10">
            <Link href="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </Button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary text-white border-none">{post.category}</Badge>
              <span className="text-sm text-gray-200 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-headline leading-tight text-white drop-shadow-lg">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
                {post.subtitle}
              </p>
            )}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{post.date}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-[1440px] px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl border-4 border-white dark:border-gray-800">
              <Image
                src={postImage?.imageUrl || "/"}
                alt={post.title}
                fill
                className="object-cover"
                priority
                data-ai-hint={postImage?.imageHint}
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.map((section, idx) => {
                switch (section.type) {
                  case 'heading':
                    return <h2 key={idx} className="text-3xl font-bold mt-12 mb-6 font-headline border-b-2 border-primary/10 pb-2">{section.text}</h2>;
                  case 'paragraph':
                    return <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">{section.text}</p>;
                  case 'list':
                    return (
                      <ul key={idx} className="space-y-3 mb-8 list-none pl-0">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case 'checklist':
                    return (
                      <div key={idx} className="bg-primary/5 rounded-2xl p-8 mb-8 border border-primary/10">
                        <ul className="space-y-4 list-none pl-0">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-800 dark:text-gray-200 font-medium">
                              <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  case 'table':
                    return (
                      <div key={idx} className="overflow-x-auto mb-12 rounded-xl border border-border">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-primary/10">
                            <tr>
                              {section.headers.map((h, i) => (
                                <th key={i} className="px-6 py-4 font-bold text-primary uppercase tracking-wider text-sm">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows.map((row, i) => (
                              <tr key={i} className="border-t border-border hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                                {row.map((cell, j) => (
                                  <td key={j} className="px-6 py-4 text-gray-700 dark:text-gray-300 align-top leading-relaxed">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  case 'quote':
                    return (
                      <blockquote key={idx} className="border-l-4 border-primary pl-8 py-4 my-12 bg-primary/5 rounded-r-2xl italic">
                        <p className="text-2xl text-gray-800 dark:text-gray-200 mb-4">"{section.text}"</p>
                        <cite className="text-sm font-bold text-primary not-italic">— {section.author}</cite>
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Newsletter Hook */}
            <div className="mt-20 p-10 bg-gray-900 text-white rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 font-headline">Enjoyed this guide?</h3>
                <p className="text-gray-400 mb-8 text-lg max-w-xl">
                  Get tech tips like these delivered straight to your inbox twice a month. Join our community of over 15,000 tech enthusiasts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white px-6 py-3 rounded-full flex-1 focus:ring-2 focus:ring-primary outline-none" />
                  <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 font-bold shadow-lg">Subscribe Now</Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Related Content */}
            {relatedPosts.length > 0 && (
              <section>
                <h3 className="text-xl font-bold mb-6 font-headline flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Related Reading
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.slug} href={`/blogs/${rp.slug}`} className="group flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <Image
                          src={PlaceHolderImages.find(img => img.id === rp.image)?.imageUrl || "/"}
                          alt={rp.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {rp.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{rp.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Shop Spotlight */}
            <section className="bg-white/50 dark:bg-gray-800/50 p-8 rounded-3xl border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 font-headline">Ready to Upgrade?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Discover the latest authentic devices at the best prices in Kenya.
              </p>
              <div className="space-y-4">
                <Button asChild className="w-full rounded-full py-6 font-bold flex items-center gap-2">
                  <Link href="/products">
                    <ShoppingBag className="w-5 h-5" />
                    Browse Our Shop
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full py-6 font-bold bg-transparent border-primary text-primary hover:bg-primary/5">
                  <Link href="https://wa.me/254729462462">
                    <MessageCircle className="w-5 h-5" />
                    Chat with an Expert
                  </Link>
                </Button>
              </div>
            </section>

            {/* Browse by Category */}
            <section>
              <h3 className="text-xl font-bold mb-6 font-headline border-b pb-2">Browse Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['Smartphones', 'Laptops', 'Tech Tips', 'Buying Guides', 'Home Appliances', 'Accessories'].map((cat) => (
                  <Link key={cat} href="#" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all">
                    {cat}
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular Tags */}
            <section>
              <h3 className="text-xl font-bold mb-6 font-headline border-b pb-2">Popular Tags</h3>
              <div className="flex flex-wrap gap-3">
                {['#SmartphoneGuide', '#LaptopTips', '#BudgetTech', '#KenyaElectronics', '#NewArrivals'].map((tag) => (
                  <span key={tag} className="text-xs text-gray-500 hover:text-primary cursor-pointer flex items-center gap-1 font-medium">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
