import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-500">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating ? 'fill-gold text-gold' : 'text-border'
            }`}
          />
        ))}
      </div>
      <Quote className="w-6 h-6 text-secondary/30 mb-3" />
      <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
        {testimonial.review}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary font-body">
            {testimonial.name?.charAt(0) || 'C'}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold font-body text-foreground">{testimonial.name}</p>
          {testimonial.location && (
            <p className="text-xs font-body text-muted-foreground">{testimonial.location}</p>
          )}
        </div>
      </div>
    </div>
  );
}