import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold leading-none">Capital Shine</span>
                <span className="block text-[10px] font-body tracking-widest uppercase opacity-70">
                  Cleaning Inc.
                </span>
              </div>
            </div>
            <p className="text-sm font-body opacity-75 leading-relaxed max-w-xs">
              Edmonton's premium cleaning service. We bring the shine to your home and business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-body opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-sm font-body opacity-70 hover:opacity-100 transition-opacity">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm font-body opacity-70 hover:opacity-100 transition-opacity">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {settings.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm font-body opacity-70">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{settings.city}, {settings.province}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">
              Service Areas
            </h3>
            <ul className="space-y-2 text-sm font-body opacity-70">
              <li>Edmonton</li>
              <li>St. Albert</li>
              <li>Sherwood Park</li>
              <li>Spruce Grove</li>
              <li>Leduc</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body opacity-50">
            © {year} {settings.companyName}. All rights reserved.
          </p>
          <p className="text-xs font-body opacity-50">
            Premium Cleaning Services in Edmonton, Alberta
          </p>
        </div>
      </div>
    </footer>
  );
}