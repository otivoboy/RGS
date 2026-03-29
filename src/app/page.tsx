import Hero from '@/components/hero';
import FullFeatureAds from '@/components/full-feature-ads';
import FeaturedProducts from '@/components/featured-products';
import AboutSection from '@/components/about-section';
import Testimonials from '@/components/testimonials';
import ContactInfo from '@/components/contact-info';

export default function Home() {
  return (
    <>
      <Hero />
      <FullFeatureAds />
      <FeaturedProducts />
      <AboutSection />
      <Testimonials />
      <ContactInfo />
    </>
  );
}
