import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Heart, Target, Users } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';

const VALUES = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'We genuinely love what we do. Every clean space brings us joy.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold ourselves to the highest standard in every detail.',
  },
  {
    icon: Target,
    title: 'Reliability',
    description: 'On time, every time. You can count on Capital Shine.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Proudly serving Edmonton and building lasting relationships.',
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Us | Capital Shine Cleaning Inc. Edmonton';
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
              About Us
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Edmonton's Most Trusted{' '}
              <span className="text-gold">Cleaning</span> Company
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              Capital Shine Cleaning Inc. was founded with one simple mission:
              to deliver premium cleaning services that exceed expectations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl aspect-[4/3] flex items-center justify-center">
                <span className="text-6xl">✨</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
                Our Story
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Built on Trust, Driven by Quality
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Capital Shine Cleaning Inc. was born from a desire to bring true professionalism
                  and care to the cleaning industry in Edmonton. We noticed that many homes and businesses
                  were settling for less — and we knew we could do better.
                </p>
                <p>
                  Today, we serve hundreds of satisfied clients across Edmonton, St. Albert, Sherwood Park,
                  and surrounding areas. Every member of our team is carefully vetted, professionally trained,
                  and committed to delivering results that shine.
                </p>
                <p>
                  Whether it's a one-time deep clean or a long-term contract, we bring the same level
                  of dedication and attention to detail. That's the Capital Shine difference.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
              Our Values
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              What Drives Us Every Day
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-card rounded-2xl p-6 text-center shadow-sm h-full">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                    <v.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Join hundreds of Edmonton residents and businesses who trust Capital Shine for their cleaning needs.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body rounded-xl px-8 gap-2">
                Get Your Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}