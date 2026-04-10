import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import useSiteSettings from '../../hooks/useSiteSettings';
import { toast } from 'sonner';

export default function ContactPreview() {
  const { settings } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch shortly.");
  };

  const INFO = [
    { icon: Phone, value: settings.phone, href: `tel:${settings.phone}` },
    { icon: Mail, value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, value: `${settings.city}, ${settings.province}` },
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Contact Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get Your Free Cleaning Quote
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
            Ready to experience Edmonton's most professional cleaning service?
            Reach out and we'll get back to you within a few hours.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Thank You!</h3>
                  <p className="font-body text-muted-foreground text-sm mb-6">
                    We've received your message and will respond within 24 hours.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" className="rounded-xl font-body text-sm">
                      Send Another Message
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input required placeholder="Your Name" className="rounded-xl font-body" />
                    <Input required type="email" placeholder="Email Address" className="rounded-xl font-body" />
                  </div>
                  <Input placeholder="Phone (optional)" className="rounded-xl font-body" />
                  <Textarea
                    required
                    rows={4}
                    placeholder="Tell us about your cleaning needs..."
                    className="rounded-xl font-body resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={sending}
                    className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl gap-2 w-full sm:w-auto transition-transform hover:-translate-y-0.5"
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.1} className="lg:col-span-2 flex flex-col gap-4 justify-center">
            {INFO.map(({ icon: Icon, value, href }) => (
              <div key={value} className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                {href ? (
                  <a href={href} className="text-sm font-body text-foreground hover:text-secondary transition-colors">
                    {value}
                  </a>
                ) : (
                  <span className="text-sm font-body text-foreground">{value}</span>
                )}
              </div>
            ))}
            <div className="bg-primary rounded-2xl p-5 mt-2">
              <p className="text-sm font-body text-primary-foreground/80 leading-relaxed">
                Serving Edmonton, St. Albert, Sherwood Park, Spruce Grove &amp; surrounding areas.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}