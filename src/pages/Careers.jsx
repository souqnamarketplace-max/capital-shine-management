import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MapPin, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';

function CareerCard({ career }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-500 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{career.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm font-body text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {career.location}
            </span>
            {career.type && (
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {career.type}
              </span>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
        )}
      </button>
      {expanded && (
        <div className="px-6 pb-6 border-t border-border pt-4 space-y-4">
          <div>
            <h4 className="font-body text-sm font-semibold text-foreground mb-2">Description</h4>
            <p className="text-sm font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {career.description}
            </p>
          </div>
          {career.requirements && (
            <div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-2">Requirements</h4>
              <p className="text-sm font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {career.requirements}
              </p>
            </div>
          )}
          <div className="pt-2">
            <a
              href={`mailto:careers@capitalshinecleaning.ca?subject=Application: ${career.title}`}
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              Apply via Email →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Careers | Capital Shine Cleaning Inc. Edmonton';
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
      <section className="bg-gradient-to-br from-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
              Join Our Team
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Build Your Career at{' '}
              <span className="text-gold">Capital Shine</span>
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              We're always looking for motivated, detail-oriented individuals to join our growing team in Edmonton.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-muted rounded w-1/2 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : careers.length === 0 ? (
            <AnimatedSection className="text-center py-16">
              <h2 className="font-heading text-xl font-semibold mb-3">No Open Positions</h2>
              <p className="font-body text-muted-foreground max-w-md mx-auto">
                We don't have any openings right now, but we're always interested in hearing from great people.
                Send your resume to{' '}
                <a href="mailto:careers@capitalshinecleaning.ca" className="text-secondary hover:underline">
                  careers@capitalshinecleaning.ca
                </a>
              </p>
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