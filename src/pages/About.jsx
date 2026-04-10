import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Award, Target, Users, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';

const VALUES = [
  { icon: Heart, title: 'Passion for Cleanliness', description: 'We genuinely love what we do. Every space we clean is treated with care and pride.' },
  { icon: Award, title: 'Uncompromising Excellence', description: 'We hold ourselves to the highest standard — in every room, every visit, every time.' },
  { icon: Target, title: 'Reliability You Can Count On', description: "On time, every time. Our clients never have to wonder if we'll show up." },
  { icon: Users, title: 'Community-First Values', description: 'Proudly local. We invest in Edmonton, hire locally, and give back to our community.' },
];

const MILESTONES = [
  { value: '500+', label: 'Happy Clients' },
  { value: '5★', label: 'Average Rating' },
  { value: '3+', label: 'Years in Edmonton' },
  { value: '100%', label: 'Satisfaction Rate' },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Us | Capital Shine Cleaning Inc. — Cleaning Company in Edmonton';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Capital Shine Cleaning Inc. is Edmonton\'s trusted cleaning company. Learn about our story, our mission, and why hundreds of Edmonton homes and businesses choose us.');
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block">About Us</span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Edmonton's Most Trusted{' '}
              <span className="text-gold">Cleaning Company</span>
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              Capital Shine Cleaning Inc. is a proudly local cleaning company in Edmonton built on
              integrity, professionalism, and a genuine passion for delivering spotless spaces.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {MILESTONES.map((m) => (
              <StaggerItem key={m.label}>
                <div className="py-2">
                  <div className="font-heading text-3xl font-bold text-secondary mb-1">{m.value}</div>
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground">{m.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="group overflow-hidden rounded-2xl aspect-[4/3] bg-muted shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                  alt="Capital Shine cleaning team in Edmonton"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block">Our Story</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight">
                Built on Trust. Driven by Quality.
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Capital Shine was founded in Edmonton with a simple but powerful vision: to create a
                  cleaning company in Edmonton that people could genuinely rely on. We saw an industry
                  where standards were inconsistent and clients were left disappointed — and we knew
                  we could do better.
                </p>
                <p>
                  From day one, we invested in our team, our processes, and our products. Every cleaner
                  is background-checked, fully trained, and shares our commitment to excellence. We use
                  only eco-friendly, professional-grade products that are safe for your family and pets.
                </p>
                <p>
                  Today, we serve hundreds of satisfied residential and commercial clients across Edmonton,
                  St. Albert, Sherwood Park, and surrounding areas. Our growth has come entirely from
                  word-of-mouth — because we deliver results that speak for themselves.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block">Our Mission</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight">
                Every Space Deserves to Shine
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Our mission is to deliver consistently exceptional cleaning services that improve the
                quality of life for every Edmonton client we serve. We believe a clean home is a
                happier home — and a clean workspace is a more productive one.
              </p>
              <ul className="space-y-3">
                {[
                  'Premium results on every single visit',
                  'Transparent communication and honest pricing',
                  'Continuous training and quality assurance',
                  'Eco-conscious practices that protect Edmonton',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="group overflow-hidden rounded-2xl aspect-[4/3] bg-muted shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Professional cleaning services Edmonton mission"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">Our Values</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
              These aren't just words on a wall — they're the principles that guide every decision
              we make as Edmonton's trusted cleaning company.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="group bg-card rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 h-full border border-transparent hover:border-secondary/20">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/20 transition-colors">
                    <v.icon className="w-5 h-5 text-secondary" />
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
      <section className="py-14 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Experience the Capital Shine Difference?
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Join hundreds of Edmonton residents and businesses who trust our cleaning company for spotless results.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-8 gap-2 transition-transform hover:-translate-y-0.5">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}