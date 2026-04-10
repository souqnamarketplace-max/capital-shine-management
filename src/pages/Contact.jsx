import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { StaggerContainer, StaggerItem } from '../components/StaggerContainer';
import useSiteSettings from '../hooks/useSiteSettings';
import { toast } from 'sonner';

export default function Contact() {
  const { settings } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | Capital Shine Cleaning Inc. Edmonton, AB';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Contact Capital Shine Cleaning Inc. for a free cleaning quote in Edmonton, AB. Call, email, or fill out the form. Fast response guaranteed.');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.target);
    await base44.entities.ContactMessage.create({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      service: formData.get('service') || '',
      address: formData.get('address') || '',
      message: formData.get('message'),
    });
    setSending(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch shortly.");
  };

  const NAP = [
    {
      icon: Phone,
      label: 'Phone',
      value: settings.phone,
      href: `tel:${settings.phone}`,
      desc: 'Mon – Sat, 7AM – 7PM',
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      desc: 'We reply within a few hours',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: `${settings.city}, ${settings.province}`,
      href: null,
      desc: 'Serving Edmonton & surrounding areas',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon – Sat: 7AM – 7PM',
      href: null,
      desc: 'Sunday by appointment',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-4 block">Contact Us</span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Get a Free Cleaning Quote{' '}
              <span className="text-gold">in Edmonton</span>
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              Reach out today and our Edmonton cleaning team will get back to you within a few hours.
              No obligation. No pressure. Just a free, honest quote.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* NAP + Form */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm h-full">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12 min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Thank You!</h2>
                    <p className="font-body text-muted-foreground text-sm max-w-xs">
                      We've received your message and will respond within 24 hours.
                      We look forward to serving you.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-2">Send Us a Message</h2>
                    <p className="text-sm font-body text-muted-foreground mb-6">
                      Tell us about your cleaning needs and we'll get back to you with a custom quote.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-body text-sm font-medium">Full Name *</Label>
                          <Input id="name" name="name" required placeholder="John Smith" className="rounded-xl font-body" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-body text-sm font-medium">Email *</Label>
                          <Input id="email" name="email" type="email" required placeholder="john@example.com" className="rounded-xl font-body" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-body text-sm font-medium">Phone</Label>
                          <Input id="phone" name="phone" placeholder="(780) 000-0000" className="rounded-xl font-body" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service" className="font-body text-sm font-medium">Service Needed</Label>
                          <Input id="service" name="service" placeholder="e.g. House Cleaning" className="rounded-xl font-body" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="font-body text-sm font-medium">Property Address in Edmonton</Label>
                        <Input id="address" name="address" placeholder="123 Main St, Edmonton, AB" className="rounded-xl font-body" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-body text-sm font-medium">Message *</Label>
                        <Textarea id="message" name="message" rows={4} required placeholder="Tell us about your space and cleaning needs..." className="rounded-xl font-body resize-none" />
                      </div>
                      <Button
                        type="submit"
                        disabled={sending}
                        className="bg-secondary hover:bg-secondary/90 text-white font-body rounded-xl px-8 gap-2 transition-transform hover:-translate-y-0.5"
                      >
                        {sending ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {sending ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>

            {/* NAP Info */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatedSection delay={0.1} className="space-y-4">
                <StaggerContainer className="space-y-4">
                  {NAP.map(({ icon: Icon, label, value, href, desc }) => (
                    <StaggerItem key={label}>
                      <div className="bg-card rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-lg transition-shadow duration-400">
                        <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                          {href ? (
                            <a href={href} className="text-sm font-body font-medium text-foreground hover:text-secondary transition-colors block">
                              {value}
                            </a>
                          ) : (
                            <p className="text-sm font-body font-medium text-foreground">{value}</p>
                          )}
                          <p className="text-xs font-body text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </AnimatedSection>

              {/* Map placeholder */}
              <AnimatedSection delay={0.2}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm h-52 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/10 flex flex-col items-center justify-center text-center p-6">
                    <MapPin className="w-8 h-8 text-secondary mb-3" />
                    <p className="font-heading text-sm font-semibold text-foreground mb-1">Serving Greater Edmonton</p>
                    <p className="text-xs font-body text-muted-foreground">
                      Edmonton · St. Albert · Sherwood Park · Spruce Grove · Leduc
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom SEO text */}
      <section className="py-10 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">
              Contact Our Edmonton Cleaning Team
            </h2>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Capital Shine Cleaning Inc. proudly serves Edmonton and the surrounding Alberta communities.
              Whether you need residential cleaning, commercial cleaning, or a one-time deep clean —
              our professional cleaners in Edmonton are ready to help. Call, email, or fill out the
              form above and we'll get back to you fast.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}