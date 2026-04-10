import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import CleaningTransitionSection from '../components/CleaningTransitionSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CleaningTransitionSection bgColor="bg-background" className="px-4 sm:px-6 lg:px-8">
        <ServicesPreview />
      </CleaningTransitionSection>
      <CleaningTransitionSection bgColor="bg-primary" className="px-4 sm:px-6 lg:px-8">
        <WhyChooseUs />
      </CleaningTransitionSection>
      <CleaningTransitionSection bgColor="bg-background" className="px-4 sm:px-6 lg:px-8">
        <GallerySection />
      </CleaningTransitionSection>
      <CleaningTransitionSection bgColor="bg-background" className="px-4 sm:px-6 lg:px-8">
        <TestimonialsSection />
      </CleaningTransitionSection>
      <CTASection />
    </>
  );
}