import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT = { companyName: '', phone: '', email: '', address: '', city: 'Edmonton', province: 'AB', postalCode: '', announcementBar: { text: '', active: false, link: '' }, socialLinks: { facebook: '', instagram: '', linkedin: '' }, businessHours: { monday: '8:00 AM – 6:00 PM', tuesday: '8:00 AM – 6:00 PM', wednesday: '8:00 AM – 6:00 PM', thursday: '8:00 AM – 6:00 PM', friday: '8:00 AM – 6:00 PM', saturday: '9:00 AM – 4:00 PM', sunday: 'Closed' } };

export default function AdminSettings() {
  const [form, setForm] = useState(DEFAULT);
  const [recordId, setRecordId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) { setForm({ ...DEFAULT, ...data[0] }); setRecordId(data[0].id); }
    }
    load();
  }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm(f => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  const save = async () => {
    setSaving(true);
    if (recordId) await base44.entities.SiteSettings.update(recordId, form);
    else await base44.entities.SiteSettings.create(form);
    toast.success('Settings saved!');
    setSaving(false);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-sm font-body text-muted-foreground">Manage company info displayed across the website.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Company Info */}
        <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-heading text-base font-bold text-foreground border-b border-border pb-2">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <Label className="font-body text-sm">Company Name</Label>
              <Input value={form.companyName} onChange={e => set('companyName', e.target.value)} className="rounded-xl font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm">Phone</Label>
              <Input value={form.phone} onChange={e => set('phone', e.target.value)} className="rounded-xl font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm">Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="rounded-xl font-body" />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label className="font-body text-sm">Street Address</Label>
              <Input value={form.address || ''} onChange={e => set('address', e.target.value)} className="rounded-xl font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm">City</Label>
              <Input value={form.city || ''} onChange={e => set('city', e.target.value)} className="rounded-xl font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm">Province</Label>
              <Input value={form.province || ''} onChange={e => set('province', e.target.value)} className="rounded-xl font-body" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-heading text-base font-bold text-foreground border-b border-border pb-2">Social Media</h2>
          {['facebook', 'instagram', 'linkedin'].map(s => (
            <div key={s} className="space-y-1.5">
              <Label className="font-body text-sm capitalize">{s}</Label>
              <Input value={form.socialLinks?.[s] || ''} onChange={e => setNested('socialLinks', s, e.target.value)} className="rounded-xl font-body" placeholder="https://..." />
            </div>
          ))}
        </div>

        {/* Business Hours */}
        <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-heading text-base font-bold text-foreground border-b border-border pb-2">Business Hours</h2>
          {['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(day => (
            <div key={day} className="flex items-center gap-4">
              <Label className="font-body text-sm capitalize w-24 flex-shrink-0">{day}</Label>
              <Input value={form.businessHours?.[day] || ''} onChange={e => setNested('businessHours', day, e.target.value)} className="rounded-xl font-body" placeholder="e.g. 8:00 AM – 6:00 PM or Closed" />
            </div>
          ))}
        </div>

        {/* Announcement Bar */}
        <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-heading text-base font-bold text-foreground border-b border-border pb-2">Announcement Bar</h2>
          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" checked={form.announcementBar?.active || false} onChange={e => setNested('announcementBar', 'active', e.target.checked)} />
            Show Announcement Bar
          </label>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Message</Label>
            <Input value={form.announcementBar?.text || ''} onChange={e => setNested('announcementBar', 'text', e.target.value)} className="rounded-xl font-body" placeholder="e.g. Spring discount — 10% off all cleans!" />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Link (optional)</Label>
            <Input value={form.announcementBar?.link || ''} onChange={e => setNested('announcementBar', 'link', e.target.value)} className="rounded-xl font-body" placeholder="/contact" />
          </div>
        </div>

        <Button onClick={save} disabled={saving} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </AdminLayout>
  );
}