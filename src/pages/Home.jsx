import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BeforeAfterSection from '../components/home/BeforeAfterSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <GallerySection />
      <TestimonialsSection />
      <BeforeAfterSection />
      <CTASection />
    </>
  );
}