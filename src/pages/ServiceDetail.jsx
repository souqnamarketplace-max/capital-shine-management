import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Star, Clock, Shield, Leaf } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';

const PROCESS_STEPS = [
  { step: '01', title: 'Book Online or Call', desc: 'Schedule your clean in minutes. We work around your availability.' },
  { step: '02', title: 'Our Team Arrives', desc: 'Our professional cleaners arrive on time with all equipment and eco-friendly products.' },
  { step: '03', title: 'We Get to Work', desc: 'Every corner is cleaned to our exacting standard — nothing is overlooked.' },
  { step: '04', title: 'You Enjoy the Shine', desc: 'Inspect the results. If anything is missed, we come back at no charge.' },
];

const WHY_US = [
  { icon: Shield, text: 'Fully insured & bonded professional cleaners' },
  { icon: Star, text: '5-star rated by Edmonton clients' },
  { icon: Clock, text: 'Flexible scheduling to suit your life' },
  { icon: Leaf, text: 'Eco-friendly, family-safe products' },
  { icon: CheckCircle, text: '100% satisfaction guarantee' },
  { icon: CheckCircle, text: 'Background-checked team members' },
];

const BENEFITS = [
  'Saves you time and reduces stress',
  'Healthier, allergen-reduced living/work environment',
  'Consistent, professional results every visit',
  'Customized to your space and preferences',
  'Trusted by hundreds of Edmonton clients',
];

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=600&q=80',
  'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

  useEffect(() => {
    async function load() {
      const data = await base44.entities.Service.filter({ slug, active: true });
      if (data.length > 0) {
        const svc = data[0];
        setService(svc);
        document.title = `${svc.title} in Edmonton | Capital Shine Cleaning Inc.`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', `Professional ${svc.title.toLowerCase()} in Edmonton by Capital Shine. ${svc.shortDescription} Get a free quote today.`);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-heading text-2xl font-bold mb-4">Service Not Found</h1>
        <p className="font-body text-muted-foreground mb-6">This service doesn't exist or has been removed.</p>
        <Link to="/services">
          <Button variant="outline" className="rounded-xl font-body gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  const galleryImages = service.galleryImages?.length > 0
    ? service.galleryImages
    : service.coverImage
      ? [service.coverImage, ...FALLBACK_IMAGES.slice(0, 3)]
      : FALLBACK_IMAGES;

  return (
    <article>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-body opacity-60 hover:opacity-100 transition-opacity mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            {/* H1 = service name + Edmonton for SEO */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight max-w-3xl">
              {service.title} in{' '}
              <span className="text-gold">Edmonton</span>
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed max-w-2xl mb-8">
              {service.shortDescription}
            </p>
            <Link to="/contact">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-8 gap-2 shadow-lg shadow-secondary/30 transition-transform hover:-translate-y-0.5">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main */}
            <div className="lg:col-span-2 space-y-14">

              {/* Cover image */}
              {service.coverImage && (
                <AnimatedSection>
                  <div className="group overflow-hidden rounded-2xl aspect-video shadow-sm">
                    <img
                      src={service.coverImage}
                      alt={`${service.title} in Edmonton`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </AnimatedSection>
              )}

              {/* Full Description */}
              {service.fullDescription && (
                <AnimatedSection>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                    About Our {service.title} in Edmonton
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {service.fullDescription}
                  </p>
                </AnimatedSection>
              )}

              {/* What's Included */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {[
                    'Thorough cleaning of all rooms and surfaces',
                    'Bathroom and kitchen deep sanitization',
                    'Dusting, vacuuming and mopping',
                    'Baseboard and trim wiping',
                    'Eco-friendly, professional-grade products',
                    'Final walk-through quality check',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Benefits */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-5">
                  Benefits of Professional {service.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BENEFITS.map((b) => (
                    <div key={b} className="flex items-start gap-3 bg-muted/50 rounded-xl p-4">
                      <Star className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Our Process */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Our Process
                </h2>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {PROCESS_STEPS.map((s) => (
                    <StaggerItem key={s.step}>
                      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border h-full">
                        <div className="text-3xl font-heading font-bold text-secondary/20 mb-3">{s.step}</div>
                        <h3 className="font-heading text-base font-semibold text-foreground mb-2">{s.title}</h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </AnimatedSection>

              {/* Gallery */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-5">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.slice(0, 4).map((img, i) => (
                    <div key={i} className="group overflow-hidden rounded-xl aspect-[4/3] bg-muted">
                      <img
                        src={img}
                        alt={`${service.title} Edmonton example ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15} className="sticky top-24 space-y-5">
                {/* CTA Card */}
                <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg">
                  <h3 className="font-heading text-lg font-bold mb-2">
                    Get a Free Quote
                  </h3>
                  <p className="text-sm font-body opacity-75 leading-relaxed mb-5">
                    Ready to experience premium {service.title.toLowerCase()} in Edmonton?
                    Contact us today — no obligation.
                  </p>
                  <Link to="/contact" className="block">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl gap-2 transition-transform hover:-translate-y-0.5">
                      Request a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Why Choose Us Card */}
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-4">
                    Why Choose Us
                  </h3>
                  <ul className="space-y-3">
                    {WHY_US.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                        <Icon className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Areas Card */}
                <div className="bg-muted/50 rounded-2xl p-5">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Service Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Edmonton', 'St. Albert', 'Sherwood Park', 'Spruce Grove', 'Leduc'].map((area) => (
                      <span key={area} className="text-xs font-body bg-card border border-border rounded-full px-3 py-1 text-muted-foreground">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready for Professional {service.title} in Edmonton?
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Join hundreds of satisfied Edmonton clients who trust Capital Shine for their cleaning needs.
              Get your free, no-obligation quote today.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-10 gap-2 transition-transform hover:-translate-y-0.5">
                Get My Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </article>
  );
}