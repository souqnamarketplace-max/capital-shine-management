import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Upload, X } from 'lucide-react';

const CATEGORIES = ['Hero', 'Services', 'About', 'Gallery', 'Team', 'Other'];

export default function AdminMedia() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', altText: '', category: 'Gallery' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState('All');

  const load = async () => setItems(await base44.entities.MediaLibrary.list('-created_date'));
  useEffect(() => { load(); }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, imageUrl: file_url }));
    setUploading(false);
  };

  const save = async () => {
    if (!form.imageUrl || !form.title) return;
    setSaving(true);
    await base44.entities.MediaLibrary.create(form);
    await load();
    setForm({ title: '', altText: '', category: 'Gallery' });
    setShowForm(false);
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this image?')) return;
    await base44.entities.MediaLibrary.delete(id);
    await load();
  };

  const filtered = filterCat === 'All' ? items : items.filter(i => i.category === filterCat);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm font-body text-muted-foreground">{items.length} images</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2 font-body">
          <Plus className="w-4 h-4" /> Upload Image
        </Button>
      </div>

      {/* Upload Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-bold">Upload Image</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Image *</Label>
                <label className="flex flex-col items-center gap-3 px-4 py-6 rounded-xl border-2 border-dashed border-input bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors">
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                  ) : (
                    <>
                      {uploading ? <div className="w-6 h-6 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" /> : <Upload className="w-6 h-6 text-muted-foreground" />}
                      <span className="text-sm font-body text-muted-foreground">{uploading ? 'Uploading...' : 'Click to upload'}</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="rounded-xl font-body" placeholder="e.g. Kitchen Cleaning" />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Category</Label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full h-9 px-3 rounded-xl border border-input bg-background text-sm font-body">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Alt Text</Label>
                <Input value={form.altText || ''} onChange={e => setForm(f => ({ ...f, altText: e.target.value }))} className="rounded-xl font-body" placeholder="Describe the image" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving || uploading || !form.imageUrl || !form.title} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body">
                  {saving ? 'Saving...' : 'Save Image'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl font-body">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-colors ${filterCat === cat ? 'bg-secondary text-white' : 'bg-card text-muted-foreground hover:bg-muted'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body text-sm">No images yet. Upload your first image above.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(img => (
            <div key={img.id} className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={img.imageUrl} alt={img.altText || img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="font-body text-sm font-medium text-foreground truncate">{img.title}</p>
                <span className="text-xs font-body text-muted-foreground">{img.category}</span>
              </div>
              <button onClick={() => remove(img.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive/90 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}