import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import useSiteSettings from '../hooks/useSiteSettings';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Announcement Bar */}
      {settings.announcementBar?.active && settings.announcementBar?.text && (
        <div className="bg-primary text-primary-foreground text-center text-sm py-2 px-4 font-body">
          {settings.announcementBar.text}
        </div>
      )}

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-card/95 backdrop-blur-md shadow-lg border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading text-lg font-bold text-foreground leading-none">
                  Capital Shine
                </span>
                <span className="block text-[10px] font-body text-muted-foreground tracking-widest uppercase">
                  Cleaning Inc.
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium font-body transition-colors ${
                    location.pathname === link.path
                      ? 'text-secondary bg-secondary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a href={`tel:${settings.phone}`} className="hidden md:flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                {settings.phone}
              </a>
              <Link to="/contact">
                <Button className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body rounded-xl px-6">
                  Get a Quote
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-card border-t border-border overflow-hidden"
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium font-body transition-colors ${
                      location.pathname === link.path
                        ? 'text-secondary bg-secondary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-border">
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-2 px-4 py-3 text-sm font-body text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {settings.phone}
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}