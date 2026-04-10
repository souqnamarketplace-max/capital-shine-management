import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../AnimatedSection';
import TestimonialCard from '../TestimonialCard';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    base44.entities.Testimonial.filter({ active: true }, '-created_date', 6).then(setTestimonials);
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-muted/40 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-secondary/4 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="section-rule" />
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-secondary block mb-3">
              Client Reviews
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              What Edmonton<br />
              <span className="italic font-normal text-muted-foreground">Says About Us</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:items-end">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_,i) => <span key={i} className="text-gold text-lg">★</span>)}
            </div>
            <p className="text-sm font-body text-muted-foreground">500+ five-star reviews</p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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