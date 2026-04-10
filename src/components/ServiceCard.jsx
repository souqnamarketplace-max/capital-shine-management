import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceCard({ service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl shine-sweep"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          {service.coverImage ? (
            <img
              src={service.coverImage}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-primary/5 flex items-center justify-center">
              <span className="text-3xl opacity-20">✦</span>
            </div>
          )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-heading text-base font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300 leading-snug">
                {service.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed line-clamp-2">
                {service.shortDescription}
              </p>
            </div>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-300"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white transition-colors" />
            </motion.div>
          </div>
          {/* Bottom reveal line */}
          <div className="mt-4 h-[1px] bg-secondary/0 group-hover:bg-secondary/30 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
        </div>
      </Link>
    </motion.div>
  );
}