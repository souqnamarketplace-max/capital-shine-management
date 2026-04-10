import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, X, Check, Upload } from 'lucide-react';

const EMPTY = { title: '', slug: '', shortDescription: '', fullDescription: '', coverImage: '', sortOrder: 0, active: true, featuredOnHomepage: false };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const data = await base44.entities.Service.list('sortOrder');
    setServices(data);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing('new'); };
  const openEdit = (s) => { setForm({ ...s }); setEditing(s.id); };
  const close = () => { setEditing(null); setForm(EMPTY); };

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const save = async () => {
    setSaving(true);
    if (editing === 'new') {
      await base44.entities.Service.create(form);
    } else {
      await base44.entities.Service.update(editing, form);
    }
    await load();
    close();
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return;
    await base44.entities.Service.delete(id);
    await load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm font-body text-muted-foreground">{services.length} total</p>
        </div>
        <Button onClick={openNew} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2 font-body">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      {/* Form Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-bold">{editing === 'new' ? 'New Service' : 'Edit Service'}</h2>
              <button onClick={close}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Title *</Label>
                  <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: f.slug || autoSlug(e.target.value) }))} className="rounded-xl font-body" placeholder="e.g. House Cleaning" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Slug *</Label>
                  <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="rounded-xl font-body" placeholder="house-cleaning" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Short Description *</Label>
                <Textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} rows={2} className="rounded-xl font-body resize-none" />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Full Description</Label>
                <Textarea value={form.fullDescription || ''} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} rows={4} className="rounded-xl font-body resize-none" />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Cover Image</Label>
                <div className="flex items-center gap-3">
                  {form.coverImage && (
                    <img src={form.coverImage} alt="cover" className="w-16 h-16 rounded-xl object-cover border border-border flex-shrink-0" />
                  )}
                  <label className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-input bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors">
                    {uploading && <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />}
                    {!uploading && <Upload className="w-4 h-4 text-muted-foreground" />}
                    <span className="text-sm font-body text-muted-foreground">{uploading ? 'Uploading...' : form.coverImage ? 'Change image' : 'Upload image'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={async e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setUploading(true);
                      const { file_url } = await base44.integrations.Core.UploadFile({ file });
                      setForm(f => ({ ...f, coverImage: file_url }));
                      setUploading(false);
                    }} />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Sort Order</Label>
                  <Input type="number" value={form.sortOrder || 0} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} className="rounded-xl font-body" />
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="rounded" />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input type="checkbox" checked={form.featuredOnHomepage} onChange={e => setForm(f => ({ ...f, featuredOnHomepage: e.target.checked }))} className="rounded" />
                  Featured on Homepage
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving || uploading} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body gap-2">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outline" onClick={close} className="rounded-xl font-body">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {services.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">No services yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Title</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Slug</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Featured</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{s.title}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.slug}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${s.active ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        {s.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{s.featuredOnHomepage ? 'Yes' : 'No'}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}