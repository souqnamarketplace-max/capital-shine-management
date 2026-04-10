import { Shield, Users, ThumbsUp, Leaf, Clock, Star } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { StaggerContainer, StaggerItem } from '../StaggerContainer';
import AnimatedIcon from '../AnimatedIcon';

const REASONS = [
  { icon: Users, title: 'Vetted Professional Team', description: 'Every cleaner is background-checked, fully trained, and held to our exacting standard on every job.', animationType: 'sparkle' },
  { icon: Shield, title: 'Fully Insured & Bonded', description: "Complete peace of mind — we're fully insured and bonded for every residential and commercial clean.", animationType: 'sparkle' },
  { icon: ThumbsUp, title: '100% Satisfaction Guarantee', description: "Not satisfied? We'll return and re-clean at no cost. No arguments, no conditions.", animationType: 'sparkle' },
  { icon: Leaf, title: 'Eco-Friendly Products', description: 'Premium green formulas that are safe for children, pets, and the Edmonton environment.', animationType: 'sparkle' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Weekly, bi-weekly, or one-time cleans — we work around your schedule, not the other way around.', animationType: 'sparkle' },
  { icon: Star, title: '5-Star Rated', description: 'Hundreds of verified five-star reviews from satisfied Edmonton clients. Our reputation speaks for itself.', animationType: 'sparkle' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-16 items-start">
          <div className="flex-shrink-0 max-w-sm">
            <span className="section-rule" style={{ background: 'hsl(var(--gold))' }} />
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-gold/80 block mb-3">
              Why Capital Shine
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
              The Standard<br />
              <span className="italic font-normal text-white/50">Others Can't Match</span>
            </h2>
          </div>
          <p className="text-base font-body text-white/55 leading-relaxed max-w-md pt-2 lg:pt-8">
            We didn't set out to be the biggest cleaning company in Edmonton —
            we set out to be the best. Every detail, every time.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {REASONS.map((item, idx) => (
            <StaggerItem key={item.title}>
              <div className="group bg-primary/80 hover:bg-white/5 transition-colors duration-300 p-8 h-full shine-sweep">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-hover:shadow-[0_0_8px_rgba(244,197,66,0.3)] transition-all duration-300">
                    <AnimatedIcon animationType={item.animationType}>
                      <item.icon className="w-4 h-4 text-gold" />
                    </AnimatedIcon>
                  </div>
                  <span className="text-[10px] font-body text-white/20 font-medium">0{idx + 1}</span>
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-3 transition-colors duration-200 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-body text-white/50 leading-relaxed">
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