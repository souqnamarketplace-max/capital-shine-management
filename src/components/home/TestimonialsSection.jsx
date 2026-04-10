import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../AnimatedSection';
import TestimonialCard from '../TestimonialCard';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await base44.entities.Testimonial.filter(
        { active: true },
        '-created_date',
        6
      );
      setTestimonials(data);
    }
    load();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Client Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Edmonton Says About Us
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it — hear from our satisfied clients across Edmonton.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}