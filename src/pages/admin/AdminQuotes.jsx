import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, FileText, Download, Send } from 'lucide-react';
import { toast } from 'sonner';

const STATUS_STYLES = {
  Draft: 'bg-gray-100 text-gray-600',
  Sent: 'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Declined: 'bg-red-100 text-red-700',
  Converted: 'bg-purple-100 text-purple-700',
};

const STATUSES = ['Draft', 'Sent', 'Accepted', 'Declined', 'Converted'];

const today = () => new Date().toISOString().split('T')[0];
const futureDate = (days = 30) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};
const nextQuoteNum = (quotes) => {
  const nums = quotes.map(q => parseInt((q.quoteNumber || '').replace(/\D/g, '')) || 0);
  return `Q-${String(Math.max(0, ...nums) + 1).padStart(4, '0')}`;
};

const EMPTY_ITEM = { description: '', quantity: 1, unitPrice: 0 };

const calcTotals = (items, taxRate) => {
  const subtotal = items.reduce((s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.unitPrice) || 0), 0);
  const taxAmount = subtotal * ((parseFloat(taxRate) || 0) / 100);
  return { subtotal, taxAmount, total: subtotal + taxAmount };
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sendingEmail, setSendingEmail] = useState(null);

  const sendEmail = async (q) => {
    if (!q.clientEmail) return toast.error('No client email on this quote.');
    setSendingEmail(q.id);
    const rows = (q.items || []).map(it =>
      `<tr><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0">${it.description}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:center">${it.quantity}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:right">$${Number(it.unitPrice).toFixed(2)}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:right">$${(Number(it.quantity)*Number(it.unitPrice)).toFixed(2)}</td></tr>`
    ).join('');
    const body = `<html><body style="font-family:Arial,sans-serif;color:#1a1a2e;padding:40px;max-width:700px;margin:0 auto">
      <img src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/a6358c68e_ChatGPTImageApr10202610_30_41AM.png" style="height:70px;width:auto" alt="Capital Shine" />
      <h2 style="color:#0d2b5e">Quote ${q.quoteNumber || ''}</h2>
      <p>Hi ${q.clientName},<br>Please find your quote details below. Valid until ${q.expiryDate || 'further notice'}.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0"><thead><tr style="background:#0d2b5e;color:#fff"><th style="padding:10px;text-align:left">Description</th><th style="padding:10px;text-align:center">Qty</th><th style="padding:10px;text-align:right">Unit Price</th><th style="padding:10px;text-align:right">Amount</th></tr></thead><tbody>${rows}</tbody></table>
      <p style="text-align:right"><strong>Subtotal:</strong> $${Number(q.subtotal||0).toFixed(2)}<br><strong>Tax (${q.taxRate}%):</strong> $${Number(q.taxAmount||0).toFixed(2)}<br><strong style="font-size:16px">Total: $${Number(q.total||0).toFixed(2)}</strong></p>
      ${q.notes ? `<p><strong>Notes:</strong> ${q.notes}</p>` : ''}
      <p style="color:#888;font-size:12px;margin-top:30px">Capital Shine Cleaning Inc. — Edmonton, AB</p>
    </body></html>`;
    await base44.functions.invoke('sendClientEmail', { to: q.clientEmail, subject: `Quote ${q.quoteNumber || ''} from Capital Shine`, body });
    setSendingEmail(null);
    toast.success(`Quote sent to ${q.clientEmail}`);
  };

  const emptyForm = () => ({
    quoteNumber: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    items: [{ ...EMPTY_ITEM }],
    taxRate: 5,
    date: today(),
    expiryDate: futureDate(30),
    notes: '',
    status: 'Draft',
  });

  const [form, setForm] = useState(emptyForm());

  const load = async () => {
    const data = await base44.entities.Quote.list('-created_date');
    setQuotes(data);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    const q = emptyForm();
    q.quoteNumber = nextQuoteNum(quotes);
    setForm(q);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (quote) => {
    setForm({ ...quote, items: quote.items?.length ? quote.items : [{ ...EMPTY_ITEM }] });
    setEditing(quote.id);
    setShowForm(true);
  };

  const setItem = (idx, field, value) => {
    setForm(f => {
      const items = f.items.map((it, i) => i === idx ? { ...it, [field]: value } : it);
      return { ...f, items, ...calcTotals(items, f.taxRate) };
    });
  };

  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { ...EMPTY_ITEM }] }));
  const removeItem = (idx) => setForm(f => {
    const items = f.items.filter((_, i) => i !== idx);
    return { ...f, items, ...calcTotals(items, f.taxRate) };
  });

  const updateTax = (val) => {
    setForm(f => ({ ...f, taxRate: val, ...calcTotals(f.items, val) }));
  };

  const save = async () => {
    if (!form.clientName || !form.date) return;
    setSaving(true);
    const totals = calcTotals(form.items, form.taxRate);
    const data = { ...form, ...totals };
    if (editing) {
      await base44.entities.Quote.update(editing, data);
    } else {
      await base44.entities.Quote.create(data);
    }
    await load();
    setShowForm(false);
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this quote?')) return;
    await base44.entities.Quote.delete(id);
    await load();
  };

  const printQuote = (quote) => {
    const rows = (quote.items || []).map(it =>
      `<tr><td style="padding:8px;border-bottom:1px solid #eee">${it.description}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${it.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${parseFloat(it.unitPrice).toFixed(2)}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${(it.quantity * it.unitPrice).toFixed(2)}</td></tr>`
    ).join('');
    const html = `<!DOCTYPE html><html><head><title>Quote ${quote.quoteNumber}</title><style>body{font-family:Arial,sans-serif;color:#111;padding:40px;max-width:700px;margin:auto}h1{color:#0B2C5F}table{width:100%;border-collapse:collapse}th{background:#0B2C5F;color:#fff;padding:10px;text-align:left}.totals td{padding:6px 8px;text-align:right}.highlight{font-weight:bold;font-size:1.1em}</style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px">
      <img src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/a6358c68e_ChatGPTImageApr10202610_30_41AM.png" style="height:70px;width:auto;object-fit:contain" alt="Capital Shine" />
      <div style="text-align:right"><h2 style="color:#0B2C5F;margin:0">QUOTE</h2><p style="margin:4px 0;color:#888">${quote.quoteNumber || ''}</p></div>
    </div>
    <p><strong>Quote #:</strong> ${quote.quoteNumber || ''}</p>
    <p><strong>Date:</strong> ${quote.date} &nbsp; <strong>Expires:</strong> ${quote.expiryDate || ''}</p>
    <p><strong>Client:</strong> ${quote.clientName}<br>${quote.clientEmail || ''} ${quote.clientPhone ? '| ' + quote.clientPhone : ''}<br>${quote.clientAddress || ''}</p>
    <table><thead><tr><th>Description</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table>
    <table class="totals" style="margin-top:16px;width:100%"><tr><td>Subtotal</td><td>$${parseFloat(quote.subtotal||0).toFixed(2)}</td></tr><tr><td>Tax (${quote.taxRate}%)</td><td>$${parseFloat(quote.taxAmount||0).toFixed(2)}</td></tr><tr class="highlight"><td>Total</td><td>$${parseFloat(quote.total||0).toFixed(2)}</td></tr></table>
    ${quote.notes ? `<p style="margin-top:24px"><strong>Notes:</strong><br>${quote.notes}</p>` : ''}
    </body></html>`;
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.print();
  };

  const filtered = filterStatus === 'All' ? quotes : quotes.filter(q => q.status === filterStatus);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Quotes</h1>
          <p className="text-sm font-body text-muted-foreground">{quotes.length} total</p>
        </div>
        <Button onClick={openNew} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2 font-body">
          <Plus className="w-4 h-4" /> New Quote
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['All', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-colors ${filterStatus === s ? 'bg-primary text-white' : 'bg-card text-muted-foreground hover:bg-muted'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">No quotes yet. Create your first quote above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Quote #</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Client</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Expires</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Total</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(q => (
                  <tr key={q.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{q.quoteNumber || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{q.clientName}</div>
                      <div className="text-xs text-muted-foreground">{q.clientEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{q.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.expiryDate || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">${parseFloat(q.total || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[q.status] || 'bg-gray-100 text-gray-600'}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => sendEmail(q)} disabled={sendingEmail === q.id} className="p-1.5 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors" title={q.clientEmail ? `Send to ${q.clientEmail}` : 'No email on file'}>
                          {sendingEmail === q.id ? <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                        <button onClick={() => printQuote(q)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Download PDF">
                          <Download className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(q)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => remove(q.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-lg font-bold">{editing ? 'Edit Quote' : 'New Quote'}</h2>
              </div>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Quote meta */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Quote #</Label>
                  <Input value={form.quoteNumber} onChange={e => setForm(f => ({ ...f, quoteNumber: e.target.value }))} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Status</Label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full h-9 px-3 rounded-xl border border-input bg-background text-sm font-body">
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Quote Date *</Label>
                  <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Expiry Date</Label>
                  <Input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} className="rounded-xl font-body" />
                </div>
              </div>

              {/* Client info */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-body font-semibold uppercase tracking-wide text-muted-foreground mb-3">Client Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm">Client Name *</Label>
                    <Input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} className="rounded-xl font-body" placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm">Email</Label>
                    <Input type="email" value={form.clientEmail} onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))} className="rounded-xl font-body" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm">Phone</Label>
                    <Input value={form.clientPhone} onChange={e => setForm(f => ({ ...f, clientPhone: e.target.value }))} className="rounded-xl font-body" placeholder="(780) 000-0000" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm">Address</Label>
                    <Input value={form.clientAddress} onChange={e => setForm(f => ({ ...f, clientAddress: e.target.value }))} className="rounded-xl font-body" placeholder="123 Main St, Edmonton" />
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-body font-semibold uppercase tracking-wide text-muted-foreground mb-3">Line Items</p>
                <div className="space-y-2">
                  {form.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <Input value={item.description} onChange={e => setItem(idx, 'description', e.target.value)} placeholder="Service description" className="rounded-xl font-body text-sm" />
                      </div>
                      <div className="col-span-2">
                        <Input type="number" min="1" value={item.quantity} onChange={e => setItem(idx, 'quantity', e.target.value)} placeholder="Qty" className="rounded-xl font-body text-sm" />
                      </div>
                      <div className="col-span-3">
                        <Input type="number" min="0" step="0.01" value={item.unitPrice} onChange={e => setItem(idx, 'unitPrice', e.target.value)} placeholder="Price" className="rounded-xl font-body text-sm" />
                      </div>
                      <div className="col-span-1 text-right text-xs font-body text-muted-foreground">
                        ${((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)).toFixed(2)}
                      </div>
                      <div className="col-span-1 text-right">
                        <button onClick={() => removeItem(idx)} className="text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={addItem} className="mt-3 rounded-xl font-body gap-1 text-xs">
                  <Plus className="w-3 h-3" /> Add Item
                </Button>
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 flex flex-col items-end gap-2 text-sm font-body">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Tax Rate (%)</span>
                  <Input type="number" min="0" step="0.1" value={form.taxRate} onChange={e => updateTax(e.target.value)} className="w-20 rounded-xl text-sm font-body" />
                </div>
                <div className="text-muted-foreground">Subtotal: <span className="text-foreground font-medium">${(form.subtotal || 0).toFixed(2)}</span></div>
                <div className="text-muted-foreground">Tax: <span className="text-foreground font-medium">${(form.taxAmount || 0).toFixed(2)}</span></div>
                <div className="text-base font-bold text-foreground">Total: ${(form.total || 0).toFixed(2)}</div>
              </div>

              {/* Notes */}
              <div className="border-t border-border pt-4 space-y-1.5">
                <Label className="font-body text-sm">Notes</Label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} placeholder="Any additional notes or terms..." className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm font-body resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving || !form.clientName} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body">
                  {saving ? 'Saving...' : editing ? 'Update Quote' : 'Create Quote'}
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