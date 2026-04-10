import { Link } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSiteSettings from '../hooks/useSiteSettings';

export default function MobileCTA() {
  const { settings } = useSiteSettings();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card shadow-lg">
      <a
        href={`tel:${settings.phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-body font-semibold text-primary bg-gold hover:bg-gold/90 transition-colors"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-body font-semibold text-white bg-secondary hover:bg-secondary/90 transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        Get a Quote
      </Link>
    </div>
  );
}