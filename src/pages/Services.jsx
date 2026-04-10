import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Our Services | Capital Shine Cleaning Inc. Edmonton';
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
      <section className="bg-gradient-to-br from-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
              Our Services
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Premium Cleaning Services in{' '}
              <span className="text-gold">Edmonton</span>
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              From residential deep cleans to full commercial building maintenance —
              we offer a complete range of professional cleaning services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
    </>
  );
}