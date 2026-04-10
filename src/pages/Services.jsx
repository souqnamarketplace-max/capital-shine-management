import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Cleaning Services in Edmonton | Capital Shine Cleaning Inc.';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Explore our full range of professional cleaning services in Edmonton — residential, commercial, deep cleaning, move-in/out, and more. Get a free quote today.');
    async function load() {
      const data = await base44.entities.Service.filter({ active: true }, 'sortOrder');
      setServices(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block">
              Our Services
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Professional Cleaning Services in Edmonton
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              Capital Shine offers a complete range of residential cleaning and commercial cleaning
              services in Edmonton. From regular house cleaning to post-construction deep cleans,
              our professional cleaners in Edmonton deliver spotless results every time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              All Cleaning Services
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl leading-relaxed">
              Every service is delivered by our vetted, insured professional cleaning team in Edmonton.
              Click any service to learn more and request a free quote.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            <AnimatedSection className="text-center py-20">
              <p className="text-lg font-body text-muted-foreground">
                Our services are being updated. Please check back soon!
              </p>
            </AnimatedSection>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <StaggerItem key={service.id}>
                  <ServiceCard service={service} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Bottom SEO Text */}
      {!loading && services.length > 0 && (
        <section className="py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
                Why Choose Our Cleaning Services in Edmonton?
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Capital Shine Cleaning Inc. is Edmonton's trusted provider of residential and
                commercial cleaning services. Our professional cleaners are fully insured, background
                checked, and trained to deliver consistent, high-quality results. Whether you need
                regular house cleaning, a one-time deep clean, or reliable commercial cleaning in
                Edmonton — we have a solution tailored to your needs.
              </p>
            </AnimatedSection>
          </div>
        </section>
      )}
    </>
  );
}