import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        {service.coverImage ? (
          <img
            src={service.coverImage}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            style={{ '--tw-scale-x': 'var(--scale, 1)', '--tw-scale-y': 'var(--scale, 1)' }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
            <span className="text-3xl opacity-30">✦</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors leading-snug">
              {service.title}
            </h3>
            <p className="text-sm font-body text-muted-foreground leading-relaxed line-clamp-2">
              {service.shortDescription}
            </p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-300 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white transition-colors" />
          </div>
        </div>
        {/* Bottom gold rule — reveals on hover */}
        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-secondary/0 group-hover:bg-secondary/30 transition-all duration-500" />
      </div>
    </Link>
  );
}

export default function ServicesPreview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    base44.entities.Service.filter({ active: true, featuredOnHomepage: true }, 'sortOrder', 6).then(setServices);
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — editorial style */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="section-rule" />
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-secondary block mb-3">
              What We Offer
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Our Premium<br />
              <span className="italic font-normal text-muted-foreground">Services</span>
            </h2>
          </div>
          <p className="text-sm font-body text-muted-foreground max-w-xs leading-relaxed sm:text-right">
            From deep home cleaning to complete office care — spotless results, every visit.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="flex justify-center" delay={0.2}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-border text-sm font-body font-medium text-foreground rounded-xl px-7 py-3 hover:bg-muted hover:border-secondary/40 transition-all duration-300"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}