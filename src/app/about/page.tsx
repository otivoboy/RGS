import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Headphones, 
  Banknote, 
  Truck, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Building2,
  Rocket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const storeTeamImage = PlaceHolderImages.find(
    (p) => p.id === 'about-store-team'
  );

  const journey = [
    { year: '2015', text: 'Opened our first store with a single shelf of mobile phones and a vision for affordable quality.' },
    { year: '2018', text: 'Expanded to laptops, PCs, and home appliances—welcoming our first dedicated tech support team.' },
    { year: '2021', text: 'Launched countrywide delivery, reaching customers beyond city limits for the first time.' },
    { year: '2024', text: 'Grew into a trusted national name with thousands of devices delivered and a team passionate about tech for all.' },
    { year: 'Today', text: 'Hundreds of products, real-time support, and a commitment to keep growing—with you.' },
  ];

  const benefits = [
    {
      category: 'Quality Assurance',
      items: ['Authentic products', 'Full warranty coverage', 'Every item double-checked'],
      icon: ShieldCheck,
    },
    {
      category: 'Expert Support',
      items: ['Personalized recommendations', 'Tech-savvy, friendly team', 'We listen, we guide'],
      icon: Headphones,
    },
    {
      category: 'Best Prices',
      items: ['Competitive pricing', 'Regular deals & discounts', 'More value, always'],
      icon: Banknote,
    },
    {
      category: 'Countrywide Delivery',
      items: ['Fast, reliable shipping', 'From city to remote areas', 'Real-time tracking available'],
      icon: Truck,
    },
  ];

  const audience = [
    { title: 'For students', text: 'We help you find affordable, durable devices built for study and creativity.', icon: GraduationCap },
    { title: 'For professionals', text: 'We deliver performance you can depend on—laptops, workstations, and business support.', icon: Briefcase },
    { title: 'For families', text: 'We recommend devices that keep everyone connected, safe, and entertained.', icon: Home },
    { title: 'For businesses', text: 'We outfit offices with reliable equipment and bulk support options.', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-primary/5">
        <div className="container mx-auto max-w-[1440px] px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-headline leading-tight">
              We’ve Been Moving Fast,<br />
              <span className="text-primary">So You Don’t Have to Wait</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              From a single storefront to a trusted name across the country, we’ve built Rwathia Gadget Store on one simple idea: everyone deserves access to quality technology without the high price tag.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/products">Browse Our Catalog</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-headline">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                To make quality technology accessible to everyone—with honest pricing, expert guidance, and service that reaches every doorstep across the country.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We carefully curate every product, from smartphones and laptops to home appliances and accessories. Only the most reliable brands and the latest models make it to our shelves, because you deserve technology you can trust—delivered fast, supported fully, and priced fairly.
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              <Image
                src={storeTeamImage?.imageUrl ?? '/'}
                alt={storeTeamImage?.description ?? 'Rwathia Gadget Store Team'}
                fill
                className="object-cover"
                data-ai-hint={storeTeamImage?.imageHint}
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-center italic">Our team—real faces, real expertise, ready to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-[1440px] px-4">
          <h2 className="text-3xl font-bold mb-12 text-center font-headline">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {journey.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="mb-4 text-primary font-black text-4xl font-headline opacity-20 group-hover:opacity-100 transition-opacity">
                  {item.year}
                </div>
                <div className="h-1 w-full bg-primary/10 mb-4 overflow-hidden">
                  <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1440px] px-4">
          <h2 className="text-3xl font-bold mb-12 text-center font-headline">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-headline">{benefit.category}</h3>
                  <ul className="space-y-3">
                    {benefit.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-headline">What Drives Us</h2>
            <p className="text-gray-600 dark:text-gray-400">We’re driven by real people, real needs, and real connections.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audience.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2 font-headline">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Than a Store */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-headline">More Than a Store</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              We believe technology should lift communities—not just individuals. Over the years, we’ve partnered with local schools to support digital literacy programs. We’ve helped small businesses get equipped with the tools they need to grow. And we’ve worked to make sure that no matter where you live, quality tech is within reach.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our team members live in the neighborhoods we serve. They know the landscape, understand local needs, and bring a personal touch to every interaction—whether in-store, online, or on the road delivering to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-[1440px] px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 font-headline">Looking Ahead</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            We’re not slowing down. Our goal remains the same as it was in 2015: to be the place you trust for quality tech, fair prices, and service that moves as fast as you do.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {['Expanded smart home range', 'Real-time tracking', '24/7 support chat', 'Enhanced tech support'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-xs font-bold uppercase tracking-wider">
                <Rocket className="w-4 h-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
            <h2 className="text-4xl font-bold mb-6 font-headline">Join the Movement</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Whether you’re browsing, buying, or just exploring your options—you’re part of what keeps us moving forward.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Link href="tel:+254729462462" className="group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-left">
                <h5 className="font-bold mb-2 flex items-center justify-between">Have a question? <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" /></h5>
                <p className="text-xs text-gray-500">Call our team for expert advice.</p>
              </Link>
              <Link href="/products" className="group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-left">
                <h5 className="font-bold mb-2 flex items-center justify-between">Looking for something? <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" /></h5>
                <p className="text-xs text-gray-500">Let us help you find the perfect fit.</p>
              </Link>
              <Link href="/contact" className="group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-left">
                <h5 className="font-bold mb-2 flex items-center justify-between">Need support? <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" /></h5>
                <p className="text-xs text-gray-500">We’re here even after checkout.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
