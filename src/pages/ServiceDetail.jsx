import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await base44.entities.Service.filter({ slug, active: true });
      if (data.length > 0) {
        setService(data[0]);
        document.title = `${data[0].title} | Capital Shine Cleaning Inc. Edmonton`;
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
        <p className="font-body text-muted-foreground mb-6">
          The service you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/services">
          <Button variant="outline" className="rounded-xl font-body gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-body opacity-70 hover:opacity-100 transition-opacity mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {service.coverImage && (
                <AnimatedSection className="mb-8">
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full rounded-2xl object-cover aspect-video shadow-sm"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
              <AnimatedSection delay={0.1}>
                <div className="prose prose-slate max-w-none font-body">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {service.fullDescription || service.shortDescription}
                  </p>
                </div>
              </AnimatedSection>

              {/* Gallery */}
              {service.galleryImages?.length > 0 && (
                <AnimatedSection delay={0.2} className="mt-10">
                  <h2 className="font-heading text-xl font-semibold mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {service.galleryImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${service.title} gallery ${i + 1}`}
                        className="w-full rounded-xl object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
                  <h3 className="font-heading text-lg font-semibold mb-4">Why Choose This Service?</h3>
                  <ul className="space-y-3 mb-6">
                    {['Professional & insured team', 'Eco-friendly products', 'Satisfaction guaranteed', 'Flexible scheduling'].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body rounded-xl gap-2">
                      Get a Free Quote
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}