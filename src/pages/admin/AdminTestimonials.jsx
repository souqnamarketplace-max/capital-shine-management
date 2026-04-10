import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

const EMPTY = { name: '', location: '', review: '', rating: 5, active: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await base44.entities.Testimonial.list('-created_date'));
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing('new'); };
  const openEdit = (t) => { setForm({ ...t }); setEditing(t.id); };
  const close = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    setSaving(true);
    if (editing === 'new') await base44.entities.Testimonial.create(form);
    else await base44.entities.Testimonial.update(editing, form);
    await load(); close(); setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await base44.entities.Testimonial.delete(id); await load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm font-body text-muted-foreground">{items.length} total</p>
        </div>
        <Button onClick={openNew} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2 font-body">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-bold">{editing === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h2>
              <button onClick={close}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Client Name *</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Location</Label>
                  <Input value={form.location || ''} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="rounded-xl font-body" placeholder="Edmonton, AB" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Review *</Label>
                <Textarea value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} rows={4} className="rounded-xl font-body resize-none" />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Rating (1–5)</Label>
                <Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className="rounded-xl font-body w-24" />
              </div>
              <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                Active (visible on website)
              </label>
              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body gap-2">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outline" onClick={close} className="rounded-xl font-body">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">No testimonials yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {items.map(t => (
              <div key={t.id} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-body font-semibold text-sm text-foreground">{t.name}</span>
                    {t.location && <span className="text-xs text-muted-foreground">· {t.location}</span>}
                    <span className="text-xs text-gold">{'★'.repeat(t.rating)}</span>
                    {!t.active && <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">Hidden</span>}
                  </div>
                  <p className="text-sm font-body text-muted-foreground line-clamp-2">{t.review}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}