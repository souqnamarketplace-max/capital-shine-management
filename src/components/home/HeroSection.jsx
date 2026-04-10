import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TRUST_POINTS = [
  { icon: Shield, text: 'Experienced Team' },
  { icon: Clock, text: 'Flexible Scheduling' },
  { icon: Star, text: 'Reliable Service' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-primary text-primary-foreground">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/5 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-body font-semibold tracking-widest uppercase">
                Edmonton's Premium Cleaning
              </span>
            </motion.div>

            {/* H1 — SEO headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            >
              Premium{' '}
              <span className="text-gold">Cleaning Services</span>{' '}
              in Edmonton
            </motion.h1>

            {/* Subheadline with keywords */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-body opacity-80 leading-relaxed mb-8 max-w-xl"
            >
              Capital Shine delivers professional residential cleaning in Edmonton and commercial
              cleaning services across the city. Trusted by hundreds of homes and businesses —
              experience the shine difference.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-8 gap-2 shadow-lg shadow-secondary/30 transition-transform hover:-translate-y-0.5"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-body rounded-xl px-8 transition-transform hover:-translate-y-0.5"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {TRUST_POINTS.map((pt) => (
                <div key={pt.text} className="flex items-center gap-2 text-sm font-body opacity-75">
                  <pt.icon className="w-4 h-4 text-gold" />
                  {pt.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Professional cleaning services in Edmonton"
                className="w-full h-full object-cover"
              />
              {/* Overlay card */}
              <div className="absolute bottom-5 left-5 bg-card/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['S','M','J'].map((l) => (
                      <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-white flex items-center justify-center text-xs font-bold text-white">{l}</div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_,i) => (
                        <span key={i} className="text-gold text-xs">★</span>
                      ))}
                    </div>
                    <p className="text-xs font-body text-muted-foreground">500+ happy clients</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-gold/30 opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-secondary/40 opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}