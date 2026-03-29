import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import Preloader from '@/components/preloader';
import ScrollToTopOnNavigate from '@/components/scroll-to-top-on-navigate';

export const metadata: Metadata = {
  title:
    'Rwathia Gadget Store - Where Quality Meets Affordability | Electronics Store Kenya',
  description:
    'Discover the latest smartphones, laptops, PCs, home appliances, and accessories at unbeatable prices. Country wide delivery available across Kenya. iPhone 17, Samsung Galaxy S26, MacBook Pro, gaming PCs, kitchen appliances and more. Quality products, expert service, and customer satisfaction guaranteed.',
  keywords: [
    'electronics store Kenya',
    'smartphones Kenya',
    'laptops Nairobi',
    'iPhone 17 Kenya',
    'Samsung Galaxy S26',
    'MacBook Pro Kenya',
    'gaming PC Kenya',
    'home appliances Kenya',
    'kitchen appliances Nairobi',
    'mobile phones Kenya',
    'computer store Nairobi',
    'electronics Moi Avenue',
    'country wide delivery Kenya',
    'M-Pesa payment',
    'Visa payment Kenya',
    'best electronics prices Kenya',
    'authentic electronics Kenya',
    'warranty electronics Kenya',
    'Rwathia Gadget Store',
    'HH Towers Moi Avenue',
  ].join(', '),
  authors: [{ name: 'Rwathia Gadget Store' }],
  creator: 'Rwathia Gadget Store',
  publisher: 'Rwathia Gadget Store',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://rwathiagadgetstore.com',
    siteName: 'Rwathia Gadget Store',
    title: 'Rwathia Gadget Store - Where Quality Meets Affordability',
    description:
      "Kenya's premier electronics store offering smartphones, laptops, PCs, and home appliances with country wide delivery. Best prices guaranteed!",
    images: [
      {
        url: '/logo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Rwathia Gadget Store - Electronics Store Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rwathiagadgets',
    creator: '@rwathiagadgets',
    title: 'Rwathia Gadget Store - Electronics Store Kenya',
    description:
      'Latest smartphones, laptops, PCs & home appliances with country wide delivery across Kenya. Best prices guaranteed!',
    images: ['/logo-og.jpg'],
  },
  alternates: {
    canonical: 'https://rwathiagadgetstore.com',
  },
  category: 'Electronics Store',
  classification: 'Business',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  other: {
    'geo.region': 'KE-30',
    'geo.placename': 'Nairobi',
    'geo.position': '-1.2864;36.8219',
    ICBM: '-1.2864, 36.8219',
    'business:contact_data:street_address': 'HH Towers, Moi Avenue',
    'business:contact_data:locality': 'Nairobi',
    'business:contact_data:region': 'Nairobi County',
    'business:contact_data:postal_code': '00100',
    'business:contact_data:country_name': 'Kenya',
    'business:contact_data:phone_number': '+254729462462',
    'business:contact_data:email': 'info@rwathiagadgetstore.com',
  },
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ElectronicsStore',
              name: 'Rwathia Gadget Store',
              description:
                "Kenya's premier electronics store offering smartphones, laptops, PCs, and home appliances with country wide delivery.",
              url: 'https://rwathiagadgetstore.com',
              telephone: '+254729462462',
              email: 'info@rwathiagadgetstore.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'HH Towers, Moi Avenue',
                addressLocality: 'Nairobi',
                addressRegion: 'Nairobi County',
                postalCode: '00100',
                addressCountry: 'KE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -1.2864,
                longitude: 36.8219,
              },
              openingHours: [
                'Mo-Fr 08:00-20:00',
                'Sa 08:00-21:00',
                'Su 10:00-15:00',
              ],
              paymentAccepted: ['Cash', 'Credit Card', 'M-Pesa', 'Bank Transfer'],
              currenciesAccepted: 'KES',
              priceRange: '$$',
              sameAs: [
                'https://facebook.com/rwathiagadgetstore',
                'https://x.com/rwathiagadgets',
                'https://instagram.com/rwathiagadgetstore'
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <ScrollToTopOnNavigate />
          <Navbar />
          <main className="min-h-[calc(100vh-10rem)]">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
