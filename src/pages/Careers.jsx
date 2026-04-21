import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MapPin, Briefcase, ChevronDown, ChevronUp, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import useSiteSettings from '../hooks/useSiteSettings';

const PERKS = [
  { emoji: '💰', title: 'Competitive Pay', desc: 'Above-average wages with performance bonuses.' },
  { emoji: '📅', title: 'Flexible Hours', desc: 'Schedules that work around your life.' },
  { emoji: '🌱', title: 'Growth Opportunities', desc: 'Training, development, and promotion paths.' },
  { emoji: '🤝', title: 'Great Team Culture', desc: 'A supportive, positive work environment.' },
];

function CareerCard({ career }) {
  const [expanded, setExpanded] = useState(false);
  const { settings } = useSiteSettings();
  const applyEmail = `${settings.email || 'careers@capitalshinecleaning.ca'}?subject=Application: ${encodeURIComponent(career.title)}`;

  return (
    <div className="bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden border border-transparent hover:border-secondary/20">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{career.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm font-body text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" /> {career.location}
            </span>
            {career.type && (
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-secondary" /> {career.type}
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 mt-1 text-muted-foreground">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-border pt-5 space-y-5">
          <div>
            <h4 className="font-body text-sm font-semibold text-foreground mb-2">About the Role</h4>
            <p className="text-sm font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">{career.description}</p>
          </div>
          {career.requirements && (
            <div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-2">Requirements</h4>
              <p className="text-sm font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">{career.requirements}</p>
            </div>
          )}
          <a href={`mailto:${applyEmail}`}>
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl gap-2 transition-transform hover:-translate-y-0.5">
              Apply for This Role <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSiteSettings();

  useEffect(() => {
    document.title = 'Careers | Capital Shine Cleaning Inc. Edmonton';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Join the Capital Shine team in Edmonton. We\'re hiring professional cleaners and supervisors. Competitive pay, flexible hours, and a great team culture.');
    async function load() {
      const data = await base44.entities.Career.filter({ active: true }, '-created_date');
      setCareers(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block">Join Our Team</span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Build Your Career at{' '}
              <span className="text-gold">Capital Shine</span>
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              We're always looking for motivated, detail-oriented people to join our growing
              professional cleaning team in Edmonton. Great pay, flexible hours, and a team
              that genuinely cares.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Perks */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Why Work With Us
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              We take care of our team the same way we take care of our clients — with respect, fairness, and genuine appreciation.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-card rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 h-full">
                  <div className="text-3xl mb-4">{p.emoji}</div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm font-body text-muted-foreground">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-14 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Open Positions
            </h2>
            <p className="font-body text-muted-foreground text-sm">
              Click any role to see the full description and how to apply.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-card rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-muted rounded w-1/2 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : careers.length === 0 ? (
            <AnimatedSection className="text-center py-14">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">No Open Positions Right Now</h3>
              <p className="font-body text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                We don't have any openings at the moment, but we're always interested in hearing
                from great people. Send us your resume and we'll keep you in mind.
              </p>
              <a href={`mailto:${settings.email || 'careers@capitalshinecleaning.ca'}`}>
                <Button className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl gap-2">
                  Send Your Resume <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </AnimatedSection>
          ) : (
            <StaggerContainer className="space-y-4">
              {careers.map((career) => (
                <StaggerItem key={career.id}>
                  <CareerCard career={career} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}