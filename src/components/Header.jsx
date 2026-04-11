import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSiteSettings from '../hooks/useSiteSettings';
import { useAuth } from '@/lib/AuthContext';

const NAV_LINKS = [
{ label: 'Home', path: '/' },
{ label: 'Services', path: '/services' },
{ label: 'About', path: '/about' },
{ label: 'Careers', path: '/careers' },
{ label: 'Contact', path: '/contact' }];


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {setMobileOpen(false);}, [location.pathname]);



  return (
    <>
      {settings.announcementBar?.active && settings.announcementBar?.text &&
      <div className="bg-gold text-primary text-center text-xs py-2.5 px-4 font-body font-semibold tracking-wide">
          {settings.announcementBar.link ?
        <a href={settings.announcementBar.link} className="hover:underline">{settings.announcementBar.text}</a> :
        settings.announcementBar.text}
        </div>
      }

      <header className={`sticky top-0 z-50 bg-gradient-to-r from-[#0A1F44] to-[#123A6F] transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-black/30' : ''}`}>
        {/* Gold accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-transparent py-4 flex items-center justify-between lg:py-6">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/5c70f1559_ChatGPTImageApr10202610_30_41AM.png"

              alt="Capital Shine Cleaning Inc." className="opacity-100 h-16 sm:h-20 lg:h-[96px] w-auto object-contain" />

              
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-body font-medium transition-colors group ${
                location.pathname === link.path ?
                'text-gold' :
                'text-white/70 hover:text-white'}`
                }>
                
                  {link.label}
                  {location.pathname === link.path &&
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold rounded-full" />
                }
                </Link>
              )}
              {isAdmin &&
              <Link
                to="/admin"
                className={`relative px-4 py-2 text-sm font-body font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith('/admin') ?
                'text-gold' :
                'text-white/70 hover:text-white'}`
                }>
                
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                  {location.pathname.startsWith('/admin') &&
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold rounded-full" />
                }
                </Link>
              }
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <a href={`tel:${settings.phone}`} className="hidden md:flex items-center gap-2 text-sm font-body text-white/60 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium">{settings.phone}</span>
              </a>
              <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 bg-gold text-primary text-sm font-body font-semibold rounded-xl px-5 py-2.5 hover:bg-gold/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/20">
                Get a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Toggle menu">
                
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen &&
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-primary border-t border-white/10 overflow-hidden">
            
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors ${
                location.pathname === link.path ?
                'text-gold bg-white/5' :
                'text-white/70 hover:text-white hover:bg-white/5'}`
                }>
                
                    {link.label}
                    {location.pathname === link.path && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                  </Link>
              )}
                {isAdmin &&
              <Link
                to="/admin"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors ${
                location.pathname.startsWith('/admin') ?
                'text-gold bg-white/5' :
                'text-white/70 hover:text-white hover:bg-white/5'}`
                }>
                
                    <ShieldCheck className="w-4 h-4" /> Admin
                  </Link>
              }
                <div className="pt-3 border-t border-white/10 mt-2">
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-2 px-4 py-3 text-sm font-body text-white/60">
                    <Phone className="w-4 h-4" /> {settings.phone}
                  </a>
                </div>
              </div>
            </motion.nav>
          }
        </AnimatePresence>
      </header>
    </>);

}