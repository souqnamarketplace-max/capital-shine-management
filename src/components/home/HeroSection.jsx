import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const BADGES = [
  { icon: Shield, text: 'Insured & Bonded' },
  { icon: Clock, text: 'Same-Day Service' },
  { icon: Star, text: '5-Star Rated' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-body font-medium tracking-wide uppercase">
              Edmonton's Premium Cleaning Service
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            A Spotless Space,{' '}
            <span className="text-gold">Delivered</span> With{' '}
            <span className="text-secondary">Excellence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-body opacity-80 leading-relaxed mb-8 max-w-xl"
          >
            Professional residential and commercial cleaning services in Edmonton.
            Trusted by hundreds of homes and businesses across the city.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link to="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-8 gap-2 shadow-lg shadow-secondary/20">
                Get Your Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-body rounded-xl px-8">
                View Services
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {BADGES.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm font-body opacity-70">
                <badge.icon className="w-4 h-4 text-gold" />
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}