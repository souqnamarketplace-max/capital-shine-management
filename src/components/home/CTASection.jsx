import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import useSiteSettings from '../../hooks/useSiteSettings';

export default function CTASection() {
  const { settings } = useSiteSettings();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block opacity-80">
            Get Started Today
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Looking for Reliable{' '}
            <span className="text-gold">Cleaning Services</span>{' '}
            in Edmonton?
          </h2>
          <p className="text-lg font-body opacity-80 leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether it's residential cleaning or commercial cleaning in Edmonton —
            our professional cleaners are ready to deliver results you'll love.
            Contact us today for a free, no-obligation quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-8 gap-2 shadow-lg shadow-secondary/30 transition-transform hover:-translate-y-0.5"
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href={`tel:${settings.phone}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-body rounded-xl px-8 gap-2 transition-transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}