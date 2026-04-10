import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import useSiteSettings from '../../hooks/useSiteSettings';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const { settings } = useSiteSettings();

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-primary text-primary-foreground">

      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-gold/60 to-transparent hidden lg:block" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-gold" />
              <span className="text-[10px] font-body font-semibold tracking-[0.25em] uppercase text-gold">
                Edmonton's Premium Cleaning
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
            >
              Where Every{' '}
              <span className="italic text-gold">Space</span>
              <br />Earns Its Shine.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-lg font-body text-white/65 leading-relaxed max-w-lg mb-10"
            >
              Capital Shine delivers professional residential &amp; commercial
              cleaning across Edmonton — trusted by hundreds of homes and businesses
              for consistent, premium results.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-gold text-primary text-sm font-body font-semibold rounded-xl px-7 py-3.5 hover:bg-gold/90 transition-all hover:-translate-y-0.5 shadow-xl shadow-gold/20"
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2.5 border border-white/20 text-white text-sm font-body font-medium rounded-xl px-7 py-3.5 hover:bg-white/5 hover:border-white/40 transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-gold" />
                {settings.phone || 'Call Us Now'}
              </a>
            </motion.div>

            {/* Trust stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
              {[
                { value: '500+', label: 'Happy Clients' },
                { value: '5.0★', label: 'Average Rating' },
                { value: '100%', label: 'Satisfaction Guarantee' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-heading text-xl font-bold text-gold leading-none mb-1">{value}</div>
                  <div className="text-[11px] font-body text-white/45 uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — floating card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-black/50">
                <img
                  src="https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=700&q=85"
                  alt="Professional cleaning in Edmonton"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>

              {/* Gold border accent */}
              <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl border border-gold/20 pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-card rounded-2xl px-5 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['S','M','J'].map(l => (
                      <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-white flex items-center justify-center text-xs font-bold text-white">{l}</div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_,i) => <span key={i} className="text-gold text-xs">★</span>)}
                    </div>
                    <p className="text-xs font-body text-muted-foreground font-medium">500+ satisfied clients</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}