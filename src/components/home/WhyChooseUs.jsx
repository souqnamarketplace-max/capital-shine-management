import { Shield, Users, ThumbsUp, Leaf } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';

const REASONS = [
  {
    icon: Shield,
    title: 'Insured & Bonded',
    description: 'Complete peace of mind with fully insured and bonded cleaning professionals.',
  },
  {
    icon: Users,
    title: 'Vetted Professionals',
    description: 'Every team member is background-checked, trained, and committed to excellence.',
  },
  {
    icon: ThumbsUp,
    title: '100% Satisfaction',
    description: 'Not happy? We'll come back and re-clean at no extra cost. That's our guarantee.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'Safe for your family, pets, and the environment with premium green cleaning solutions.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Why Capital Shine
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Capital Shine Difference
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            We're not just another cleaning company. We're Edmonton's most trusted premium cleaning service.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-card rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-500 h-full">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-secondary" />
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