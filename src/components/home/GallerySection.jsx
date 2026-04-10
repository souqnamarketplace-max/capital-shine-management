import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../AnimatedSection';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

const FALLBACK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
    alt: 'Professional residential cleaning Edmonton',
  },
  {
    src: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=600&q=80',
    alt: 'Kitchen deep cleaning service Edmonton',
  },
  {
    src: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
    alt: 'Commercial office cleaning Edmonton',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    alt: 'Bathroom cleaning services Edmonton',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    alt: 'Floor cleaning professional Edmonton',
  },
  {
    src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    alt: 'Premium house cleaning Edmonton',
  },
];

export default function GallerySection() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await base44.entities.MediaLibrary.list('-created_date', 12);
        const imgs = data.filter((d) => d.imageUrl);
        setImages(imgs.length >= 4 ? imgs : []);
      } catch (_) {
        setImages([]);
      }
    }
    load();
  }, []);

  const displayImages = images.length >= 4
    ? images.slice(0, 6).map((d) => ({ src: d.imageUrl, alt: d.altText || d.title }))
    : FALLBACK_IMAGES;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Our Work
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            A Glimpse of the Capital Shine Standard
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Every space we clean is treated with the same level of care and attention to detail.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.map((img, i) => (
            <StaggerItem key={i}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}