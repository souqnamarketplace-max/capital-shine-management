import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../AnimatedSection';
import BeforeAfterSlider from '../BeforeAfterSlider';

export default function BeforeAfterSection() {
  const [transformations, setTransformations] = useState([]);

  useEffect(() => {
    base44.entities.BeforeAfterTransformation.filter({ active: true }, 'sortOrder').then(setTransformations);
  }, []);

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
        {transformations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-body text-sm">No transformations yet. Add them in the admin panel.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transformations.map(t => (
              <BeforeAfterSlider
                key={t.id}
                beforeImage={t.beforeImage}
                afterImage={t.afterImage}
                beforeLabel={t.beforeLabel || 'Before'}
                afterLabel={t.afterLabel || 'After'}
                autoWipe={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}