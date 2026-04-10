import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import useSiteSettings from '../hooks/useSiteSettings';
import { toast } from 'sonner';

export default function Contact() {
  const { settings } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | Capital Shine Cleaning Inc. Edmonton';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send delay
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSubmitted(true);
    toast.success("Your message has been sent! We'll get back to you shortly.");
  };

  const CONTACT_INFO = [
    { icon: Phone, label: 'Phone', value: settings.phone, href: `tel:${settings.phone}` },
    { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: 'Location', value: `${settings.city}, ${settings.province}` },
    { icon: Clock, label: 'Hours', value: 'Mon – Sat: 7AM – 7PM' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/95 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-secondary mb-3 block">
              Contact Us
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get Your Free{' '}
              <span className="text-gold">Cleaning</span> Quote
            </h1>
            <p className="text-lg font-body opacity-80 leading-relaxed">
              Ready to experience premium cleaning? Reach out today for a free, no-obligation estimate.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold mb-2">Thank You!</h2>
                      <p className="font-body text-muted-foreground max-w-sm mx-auto">
                        We've received your message and will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-heading text-xl font-semibold mb-6">Send Us a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="font-body text-sm">Full Name</Label>
                            <Input id="name" required placeholder="John Smith" className="rounded-xl font-body" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="font-body text-sm">Email</Label>
                            <Input id="email" type="email" required placeholder="john@example.com" className="rounded-xl font-body" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="font-body text-sm">Phone</Label>
                            <Input id="phone" placeholder="(780) 000-0000" className="rounded-xl font-body" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="service" className="font-body text-sm">Service Needed</Label>
                            <Input id="service" placeholder="e.g. House Cleaning" className="rounded-xl font-body" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="font-body text-sm">Message</Label>
                          <Textarea id="message" rows={5} required placeholder="Tell us about your cleaning needs..." className="rounded-xl font-body resize-none" />
                        </div>
                        <Button type="submit" disabled={sending} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body rounded-xl px-8 gap-2">
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
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <div key={item.label} className="bg-card rounded-2xl p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-body text-foreground hover:text-secondary transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-body text-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}