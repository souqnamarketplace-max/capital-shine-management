export default function TestimonialCard({ testimonial }) {
  return (
    <div className="group bg-card rounded-2xl p-7 border border-border hover:border-secondary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 12 12" className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-gold' : 'fill-border'}`}>
            <path d="M6 0l1.55 3.14L11 3.63l-2.5 2.43.59 3.44L6 7.77l-3.09 1.73.59-3.44L1 3.63l3.45-.49z" />
          </svg>
        ))}
      </div>

      {/* Large decorative quote mark */}
      <div className="font-heading text-6xl text-secondary/10 leading-none -mt-2 mb-1 select-none">"</div>

      <p className="text-sm font-body text-muted-foreground leading-relaxed flex-1 mb-6">
        {testimonial.review}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-border">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-heading font-bold text-primary">
            {testimonial.name?.charAt(0) || 'C'}
          </span>
        </div>
        <div>
          <p className="text-sm font-heading font-semibold text-foreground leading-none mb-1">{testimonial.name}</p>
          {testimonial.location && (
            <p className="text-[11px] font-body text-muted-foreground tracking-wide">{testimonial.location}</p>
          )}
        </div>
      </div>
    </div>
  );
}