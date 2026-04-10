import AnimatedSection from '../AnimatedSection';
import BeforeAfterSlider from '../BeforeAfterSlider';

export default function BeforeAfterSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <span className="section-rule mx-auto" />
          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-secondary block mb-3">
            The Capital Shine Difference
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5">
            See the<br />
            <span className="italic font-normal text-muted-foreground">Transformation</span>
          </h2>
          <p className="text-base font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Drag the slider to reveal the stunning results of our professional cleaning service.
          </p>
        </AnimatedSection>

        {/* Before-after sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
            beforeLabel="Before"
            afterLabel="After"
            autoWipe={true}
          />
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1593642532400-2682a8a6b9f8?w=800&q=80"
            afterImage="https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=800&q=80"
            beforeLabel="Before"
            afterLabel="After"
            autoWipe={true}
          />
        </div>
      </div>
    </section>
  );
}