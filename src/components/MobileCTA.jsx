import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSiteSettings from '../hooks/useSiteSettings';

export default function MobileCTA() {
  const { settings } = useSiteSettings();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 sm:hidden">
      <div className="flex gap-2">
        <a href={`tel:${settings.phone}`} className="flex-1">
          <Button variant="outline" className="w-full rounded-xl font-body gap-2">
            <Phone className="w-4 h-4" />
            Call Now
          </Button>
        </a>
        <Link to="/contact" className="flex-1">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl font-body">
            Get a Quote
          </Button>
        </Link>
      </div>
    </div>
  );
}