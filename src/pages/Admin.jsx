import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../components/AdminLayout';
import { Sparkles, MessageSquare, Briefcase, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [counts, setCounts] = useState({ services: 0, testimonials: 0, careers: 0, invoices: 0 });

  useEffect(() => {
    document.title = 'Admin Panel | Capital Shine';
    async function load() {
      const [s, t, c, i] = await Promise.all([
        base44.entities.Service.list(),
        base44.entities.Testimonial.list(),
        base44.entities.Career.list(),
        base44.entities.Invoice.list(),
      ]);
      setCounts({ services: s.length, testimonials: t.length, careers: c.length, invoices: i.length });
    }
    load();
  }, []);

  const CARDS = [
    { label: 'Services', count: counts.services, icon: Sparkles, path: '/admin/services', color: 'bg-secondary/10 text-secondary' },
    { label: 'Testimonials', count: counts.testimonials, icon: MessageSquare, path: '/admin/testimonials', color: 'bg-accent/10 text-accent' },
    { label: 'Careers', count: counts.careers, icon: Briefcase, path: '/admin/careers', color: 'bg-gold/10 text-gold' },
    { label: 'Invoices', count: counts.invoices, icon: FileText, path: '/admin/invoices', color: 'bg-primary/10 text-primary' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-sm font-body text-muted-foreground">Welcome to the Capital Shine admin panel.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map(({ label, count, icon: Icon, path, color }) => (
          <Link key={label} to={path} className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="font-heading text-2xl font-bold text-foreground mb-1">{count}</div>
            <div className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}