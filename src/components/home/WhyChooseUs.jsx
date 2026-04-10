import { Shield, Users, ThumbsUp, Leaf, Clock, Star } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

const REASONS = [
  {
    icon: Users,
    title: 'Professional Cleaning Team',
    description: 'Every cleaner on our professional cleaning team is background-checked, trained, and dedicated to delivering flawless results.',
  },
  {
    icon: Shield,
    title: 'Fully Insured & Bonded',
    description: 'Complete peace of mind — our reliable cleaners in Edmonton are fully insured and bonded for every job.',
  },
  {
    icon: ThumbsUp,
    title: '100% Satisfaction Guarantee',
    description: "Not happy? We'll come back and re-clean at no extra cost. That's our promise to every Edmonton client.",
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'Safe for your family, pets, and the environment. We use premium green cleaning solutions on every job.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'We work around your life. Book weekly, bi-weekly, or one-time cleans — morning, afternoon, or evening.',
  },
  {
    icon: Star,
    title: '5-Star Rated in Edmonton',
    description: 'Hundreds of five-star reviews from satisfied residential and commercial cleaning clients across Edmonton.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Why Capital Shine
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Edmonton's Most Trusted Professional Cleaners
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            From residential cleaning to commercial properties, our reliable cleaning team in
            Edmonton brings expertise and care to every single job.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full border border-transparent hover:border-secondary/20">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}