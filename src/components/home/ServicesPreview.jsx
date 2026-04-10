import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../AnimatedSection';
import ServiceCard from '../ServiceCard';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

export default function ServicesPreview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await base44.entities.Service.filter(
        { active: true, featuredOnHomepage: true },
        'sortOrder',
        6
      );
      setServices(data);
    }
    load();
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Premium Services
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            From deep home cleaning to complete office care — we deliver spotless results every time.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center" delay={0.2}>
          <Link to="/services">
            <Button variant="outline" size="lg" className="rounded-xl font-body gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}