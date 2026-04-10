import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

export default function AdminTransformations() {
  const [transformations, setTransformations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(null);

  const emptyForm = () => ({
    beforeImage: '',
    afterImage: '',
    beforeLabel: 'Before',
    afterLabel: 'After',
    sortOrder: 0,
    active: true,
  });

  const [form, setForm] = useState(emptyForm());

  const load = async () => {
    const data = await base44.entities.BeforeAfterTransformation.list('-sortOrder');
    setTransformations(data);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm(emptyForm());
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (t) => {
    setForm({ ...t });
    setEditing(t.id);
    setShowForm(true);
  };

  const handleImageUpload = async (field, file) => {
    if (!file) return;
    setUploading(field);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, [field]: file_url }));
    setUploading(null);
  };

  const save = async () => {
    if (!form.beforeImage || !form.afterImage) return;
    setSaving(true);
    if (editing) {
      await base44.entities.BeforeAfterTransformation.update(editing, form);
    } else {
      await base44.entities.BeforeAfterTransformation.create(form);
    }
    await load();
    setShowForm(false);
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this transformation?')) return;
    await base44.entities.BeforeAfterTransformation.delete(id);
    await load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Before/After Transformations</h1>
          <p className="text-sm font-body text-muted-foreground">{transformations.length} total</p>
        </div>
        <Button onClick={openNew} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2 font-body">
          <Plus className="w-4 h-4" /> New Transformation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transformations.length === 0 ? (
          <div className="col-span-full text-center py-16 text-muted-foreground font-body text-sm">No transformations yet.</div>
        ) : (
          transformations.map(t => (
            <div key={t.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
              <div className="grid grid-cols-2">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={t.beforeImage} alt={t.beforeLabel} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={t.afterImage} alt={t.afterLabel} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-xs font-body text-muted-foreground">{t.beforeLabel} → {t.afterLabel}</p>
                    <p className="text-xs font-body text-muted-foreground mt-1">Order: {t.sortOrder}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {t.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(t)} className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground text-xs font-body font-semibold hover:bg-muted/80 transition-colors flex items-center justify-center gap-1">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(t.id)} className="flex-1 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-body font-semibold hover:bg-destructive/20 transition-colors flex items-center justify-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-bold">{editing ? 'Edit Transformation' : 'New Transformation'}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Labels */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Before Label</Label>
                  <Input value={form.beforeLabel} onChange={e => setForm(f => ({ ...f, beforeLabel: e.target.value }))} placeholder="Before" className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">After Label</Label>
                  <Input value={form.afterLabel} onChange={e => setForm(f => ({ ...f, afterLabel: e.target.value }))} placeholder="After" className="rounded-xl font-body" />
                </div>
              </div>

              {/* Before Image Upload */}
              <div className="space-y-2">
                <Label className="font-body text-sm">Before Image *</Label>
                {form.beforeImage && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-border">
                    <img src={form.beforeImage} alt="Before" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl hover:border-secondary hover:bg-secondary/5 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-body font-semibold text-muted-foreground">
                    {uploading === 'beforeImage' ? 'Uploading...' : 'Upload Before Image'}
                  </span>
                  <input type="file" onChange={e => handleImageUpload('beforeImage', e.target.files[0])} disabled={uploading === 'beforeImage'} accept="image/*" className="hidden" />
                </label>
              </div>

              {/* After Image Upload */}
              <div className="space-y-2">
                <Label className="font-body text-sm">After Image *</Label>
                {form.afterImage && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-border">
                    <img src={form.afterImage} alt="After" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl hover:border-secondary hover:bg-secondary/5 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-body font-semibold text-muted-foreground">
                    {uploading === 'afterImage' ? 'Uploading...' : 'Upload After Image'}
                  </span>
                  <input type="file" onChange={e => handleImageUpload('afterImage', e.target.files[0])} disabled={uploading === 'afterImage'} accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5">
                <Label className="font-body text-sm">Display Order</Label>
                <Input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseFloat(e.target.value) }))} className="rounded-xl font-body" />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 rounded" />
                <Label className="font-body text-sm cursor-pointer">Active</Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving || !form.beforeImage || !form.afterImage} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl font-body">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}