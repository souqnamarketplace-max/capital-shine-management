import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const AREAS = ['Edmonton', 'St. Albert', 'Sherwood Park', 'Spruce Grove', 'Leduc'];

export default function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden" role="contentinfo">
      {/* Top gold line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Brand — wider */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center mb-5 group">
              <img
                src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/1095cf8b8_ChatGPTImageApr9202608_43_25PM.png"
                alt="Capital Shine Cleaning Inc."
                className="h-16 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm font-body text-white/55 leading-relaxed max-w-xs mb-6">
              Edmonton's trusted premium cleaning company. Delivering spotless homes and businesses with care, precision, and professionalism.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gold text-primary text-xs font-body font-semibold rounded-xl px-4 py-2.5 hover:bg-gold/90 transition-all hover:-translate-y-0.5">
              Book a Clean <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80 mb-5">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-body text-white/55 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <span className="w-3 h-[1px] bg-white/20 group-hover:bg-gold/60 group-hover:w-4 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${settings.phone}`} className="flex items-start gap-3 text-sm font-body text-white/55 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  {settings.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="flex items-start gap-3 text-sm font-body text-white/55 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-body text-white/55">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                {settings.city}, {settings.province}
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div className="lg:col-span-3">
            <h3 className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80 mb-5">
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              {AREAS.map(a => (
                <li key={a} className="text-sm font-body text-white/55 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/50" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-body text-white/30">
            © {year} {settings.companyName || 'Capital Shine Cleaning Inc.'}. All rights reserved.
          </p>
          <p className="text-xs font-body text-white/30">
            Premium Cleaning Services · Edmonton, Alberta
          </p>
        </div>
      </div>
    </footer>
  );
}