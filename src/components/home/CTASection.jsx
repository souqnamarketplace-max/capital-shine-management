import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import useSiteSettings from '../../hooks/useSiteSettings';

export default function CTASection() {
  const { settings } = useSiteSettings();

  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="section-rule mx-auto" style={{ background: 'hsl(var(--gold))' }} />
          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-gold/80 block mb-4">
            Get Started Today
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05]">
            Ready for a Cleaner,{' '}
            <span className="italic text-gold">Shinier</span> Space?
          </h2>
          <p className="text-lg font-body text-white/55 leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether it's your home or your office — our professional cleaning team in
            Edmonton is ready to deliver. Free quote, no pressure, no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-gold text-primary text-sm font-body font-semibold rounded-xl px-8 py-3.5 hover:bg-gold/90 transition-all hover:-translate-y-0.5 shadow-xl shadow-gold/20"
            >
              Request a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-2.5 border border-white/20 text-white text-sm font-body font-medium rounded-xl px-8 py-3.5 hover:bg-white/5 hover:border-white/40 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 text-gold" />
              Call Us Now
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}