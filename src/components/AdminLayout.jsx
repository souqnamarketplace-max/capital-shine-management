import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sparkles, MessageSquare, Briefcase, Settings, FileText, Receipt, X, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Services', icon: Sparkles, path: '/admin/services' },
  { label: 'Testimonials', icon: MessageSquare, path: '/admin/testimonials' },
  { label: 'Careers', icon: Briefcase, path: '/admin/careers' },
  { label: 'Site Settings', icon: Settings, path: '/admin/settings' },
  { label: 'Invoices', icon: FileText, path: '/admin/invoices' },
  { label: 'Receipts', icon: Receipt, path: '/admin/receipts' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-60 bg-card border-r border-border flex flex-col transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link to="/" className="font-heading text-base font-bold text-primary">Capital Shine</Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-body font-medium transition-colors',
              location.pathname === '/admin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          {NAV.map(({ label, icon: Icon, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-body font-medium transition-colors',
                location.pathname === path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link to="/" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">← Back to Website</Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 lg:hidden sticky top-0 z-20">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading text-sm font-bold text-primary">Admin Panel</span>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}