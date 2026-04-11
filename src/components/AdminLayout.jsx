import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sparkles, MessageSquare, Briefcase, Settings, FileText, Receipt, Image, X, Menu, Inbox, ClipboardList, RotateCw, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Services', icon: Sparkles, path: '/admin/services' },
  { label: 'Transformations', icon: RotateCw, path: '/admin/transformations' },
  { label: 'Testimonials', icon: MessageSquare, path: '/admin/testimonials' },
  { label: 'Careers', icon: Briefcase, path: '/admin/careers' },
  { label: 'Site Settings', icon: Settings, path: '/admin/settings' },
  { label: 'Quotes', icon: ClipboardList, path: '/admin/quotes' },
  { label: 'Invoices', icon: FileText, path: '/admin/invoices' },
  { label: 'Receipts', icon: Receipt, path: '/admin/receipts' },
  { label: 'Media Library', icon: Image, path: '/admin/media' },
  { label: 'Messages', icon: Inbox, path: '/admin/messages' },
]

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
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Link to="/">
            <img
              src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/ea24203dd_ChatGPTImageApr10202610_58_23AM.png"
              alt="Capital Shine"
              className="h-10 w-auto object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]"
            />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-muted-foreground p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-colors',
              location.pathname === '/admin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0" /> Dashboard
          </Link>
          {NAV.map(({ label, icon: Icon, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-colors',
                location.pathname === path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link to="/" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors block">← Back to Website</Link>
          <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-2 text-xs font-body text-destructive hover:text-destructive/80 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-card border-b border-border flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <img
            src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/1095cf8b8_ChatGPTImageApr9202608_43_25PM.png"
            alt="Capital Shine"
            className="h-8 w-auto object-contain"
          />
          <div className="w-8" />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}