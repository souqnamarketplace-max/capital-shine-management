import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {service.coverImage ? (
            <img
              src={service.coverImage}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          <p className="text-sm font-body text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {service.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium font-body text-secondary">
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}