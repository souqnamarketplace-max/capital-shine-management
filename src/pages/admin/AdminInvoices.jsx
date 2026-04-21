import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X, Download, Check, Send } from 'lucide-react';
import { toast } from 'sonner';

const EMPTY_LINE = { description: '', quantity: 1, unitPrice: 0 };
const STATUSES = ['Draft', 'Sent', 'Paid', 'Overdue'];
const STATUS_COLORS = { Draft: 'bg-muted text-muted-foreground', Sent: 'bg-secondary/10 text-secondary', Paid: 'bg-accent/10 text-accent', Overdue: 'bg-destructive/10 text-destructive' };

function calcTotals(lines, taxRate) {
  const subtotal = lines.reduce((sum, l) => sum + (Number(l.quantity) * Number(l.unitPrice)), 0);
  const taxAmount = subtotal * (Number(taxRate) / 100);
  return { subtotal, taxAmount, total: subtotal + taxAmount };
}

const today = () => new Date().toISOString().split('T')[0];
const nextNumber = (items) => `INV-${String((items.length || 0) + 1).padStart(4, '0')}`;

const EMPTY_FORM = (items) => ({
  invoiceNumber: nextNumber(items),
  clientName: '', clientEmail: '', clientAddress: '',
  services: [{ ...EMPTY_LINE }],
  taxRate: 5, date: today(), dueDate: '', notes: '', status: 'Draft',
  subtotal: 0, taxAmount: 0, total: 0,
});

export default function AdminInvoices() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await base44.entities.Invoice.list('-created_date'));
  useEffect(() => { load(); }, []);

  const openNew = () => { const f = EMPTY_FORM(items); setForm(f); setEditing('new'); };
  const openEdit = (inv) => { setForm({ ...inv, services: inv.services || [{ ...EMPTY_LINE }] }); setEditing(inv.id); };
  const close = () => { setEditing(null); setForm(null); };

  const updateLine = (i, key, val) => {
    const services = form.services.map((l, idx) => idx === i ? { ...l, [key]: val } : l);
    const totals = calcTotals(services, form.taxRate);
    setForm(f => ({ ...f, services, ...totals }));
  };

  const addLine = () => setForm(f => ({ ...f, services: [...f.services, { ...EMPTY_LINE }] }));
  const removeLine = (i) => {
    const services = form.services.filter((_, idx) => idx !== i);
    const totals = calcTotals(services, form.taxRate);
    setForm(f => ({ ...f, services, ...totals }));
  };

  const setField = (key, val) => {
    if (key === 'taxRate') {
      const totals = calcTotals(form.services, val);
      setForm(f => ({ ...f, taxRate: val, ...totals }));
    } else {
      setForm(f => ({ ...f, [key]: val }));
    }
  };

  const save = async () => {
    setSaving(true);
    if (editing === 'new') await base44.entities.Invoice.create(form);
    else await base44.entities.Invoice.update(editing, form);
    await load(); close(); setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete invoice?')) return;
    await base44.entities.Invoice.delete(id); await load();
  };

  const [sending, setSendingEmail] = useState(null);

  const sendEmail = async (inv) => {
    if (!inv.clientEmail) return toast.error('No client email on this invoice.');
    setSendingEmail(inv.id);
    const attachmentData = {
      docType: 'INVOICE', docNumber: inv.invoiceNumber,
      leftLabel: 'Bill To', clientName: inv.clientName, clientEmail: inv.clientEmail, clientAddress: inv.clientAddress,
      date: inv.date, secondaryDateLabel: inv.dueDate ? 'Due Date' : null, secondaryDate: inv.dueDate || null,
      items: inv.services, subtotal: inv.subtotal, taxRate: inv.taxRate, taxAmount: inv.taxAmount, total: inv.total,
      totalLabel: 'Total', notes: inv.notes,
    };
    await base44.functions.invoke('sendClientEmail', { to: inv.clientEmail, subject: `Invoice ${inv.invoiceNumber} from Capital Shine`, attachmentData, attachmentFilename: `Invoice-${inv.invoiceNumber}.pdf` });
    setSendingEmail(null);
    toast.success(`Invoice sent to ${inv.clientEmail}`);
  };

  const downloadPDF = (inv) => {
    const lines = (inv.services || []).map(l =>
      `<tr><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0">${l.description}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:center">${l.quantity}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:right">$${Number(l.unitPrice).toFixed(2)}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:right">$${(Number(l.quantity)*Number(l.unitPrice)).toFixed(2)}</td></tr>`
    ).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${inv.invoiceNumber}</title><style>body{font-family:Arial,sans-serif;color:#1a1a2e;padding:40px;max-width:700px;margin:0 auto}h1{color:#0d2b5e;margin-bottom:0}.label{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:2px}.val{font-size:14px;margin-bottom:12px}table{width:100%;border-collapse:collapse;margin:20px 0}th{background:#0d2b5e;color:white;padding:10px 12px;text-align:left;font-size:12px}.totals{text-align:right;margin-top:10px}.tot-row{display:flex;justify-content:flex-end;gap:40px;font-size:13px;padding:4px 0}.grand{font-weight:bold;font-size:16px;border-top:2px solid #0d2b5e;padding-top:8px;margin-top:8px}</style></head><body>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px">
        <div><img src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/a6358c68e_ChatGPTImageApr10202610_30_41AM.png" style="height:70px;width:auto;object-fit:contain" alt="Capital Shine" /><p style="color:#888;margin:4px 0;font-size:13px">Edmonton, AB</p></div>
        <div style="text-align:right"><h2 style="color:#0d2b5e;margin:0">INVOICE</h2><p style="margin:4px 0;color:#888">${inv.invoiceNumber}</p></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px">
        <div><div class="label">Bill To</div><div class="val"><strong>${inv.clientName}</strong><br>${inv.clientEmail || ''}<br>${inv.clientAddress || ''}</div></div>
        <div style="text-align:right"><div class="label">Date</div><div class="val">${inv.date}</div>${inv.dueDate ? `<div class="label">Due Date</div><div class="val">${inv.dueDate}</div>` : ''}</div>
      </div>
      <table><thead><tr><th>Description</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Amount</th></tr></thead><tbody>${lines}</tbody></table>
      <div class="totals">
        <div class="tot-row"><span>Subtotal</span><span>$${Number(inv.subtotal).toFixed(2)}</span></div>
        <div class="tot-row"><span>Tax (${inv.taxRate}%)</span><span>$${Number(inv.taxAmount).toFixed(2)}</span></div>
        <div class="tot-row grand"><span>Total</span><span>$${Number(inv.total).toFixed(2)}</span></div>
      </div>
      ${inv.notes ? `<div style="margin-top:30px;padding:12px;background:#f8f9ff;border-radius:8px;font-size:13px;color:#555"><strong>Notes:</strong> ${inv.notes}</div>` : ''}
    </body></html>`;
    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
    w.print();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-sm font-body text-muted-foreground">{items.length} total</p>
        </div>
        <Button onClick={openNew} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2 font-body">
          <Plus className="w-4 h-4" /> New Invoice
        </Button>
      </div>

      {editing && form && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-bold">{editing === 'new' ? 'New Invoice' : `Edit ${form.invoiceNumber}`}</h2>
              <button onClick={close}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Invoice #</Label>
                  <Input value={form.invoiceNumber} onChange={e => setField('invoiceNumber', e.target.value)} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Status</Label>
                  <select value={form.status} onChange={e => setField('status', e.target.value)} className="w-full h-9 px-3 rounded-xl border border-input bg-background text-sm font-body">
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Client Name *</Label>
                  <Input value={form.clientName} onChange={e => setField('clientName', e.target.value)} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Client Email</Label>
                  <Input value={form.clientEmail || ''} onChange={e => setField('clientEmail', e.target.value)} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label className="font-body text-sm">Client Address</Label>
                  <Input value={form.clientAddress || ''} onChange={e => setField('clientAddress', e.target.value)} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Date *</Label>
                  <Input type="date" value={form.date} onChange={e => setField('date', e.target.value)} className="rounded-xl font-body" />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-sm">Due Date</Label>
                  <Input type="date" value={form.dueDate || ''} onChange={e => setField('dueDate', e.target.value)} className="rounded-xl font-body" />
                </div>
              </div>

              {/* Line items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-body text-sm font-semibold">Services / Line Items</Label>
                  <button onClick={addLine} className="text-xs text-secondary font-body font-medium hover:underline">+ Add Line</button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-xs font-body text-muted-foreground px-1">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2">Qty</div>
                    <div className="col-span-3">Unit Price</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  {form.services.map((l, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-center">
                      <Input value={l.description} onChange={e => updateLine(i, 'description', e.target.value)} className="col-span-5 rounded-lg font-body h-8 text-sm" placeholder="Description" />
                      <Input type="number" min={1} value={l.quantity} onChange={e => updateLine(i, 'quantity', e.target.value)} className="col-span-2 rounded-lg font-body h-8 text-sm" />
                      <Input type="number" min={0} step="0.01" value={l.unitPrice} onChange={e => updateLine(i, 'unitPrice', e.target.value)} className="col-span-3 rounded-lg font-body h-8 text-sm" />
                      <div className="col-span-1 text-right text-xs font-body text-muted-foreground">
                        ${(Number(l.quantity) * Number(l.unitPrice)).toFixed(2)}
                      </div>
                      <button onClick={() => removeLine(i)} className="col-span-1 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 space-y-1.5">
                <div className="flex items-center gap-3">
                  <Label className="font-body text-sm w-20">Tax Rate %</Label>
                  <Input type="number" min={0} max={100} value={form.taxRate} onChange={e => setField('taxRate', e.target.value)} className="w-20 rounded-xl font-body h-8 text-sm" />
                </div>
                <div className="flex justify-end gap-8 text-sm font-body">
                  <div className="space-y-1 text-right text-muted-foreground">
                    <div>Subtotal</div>
                    <div>Tax ({form.taxRate}%)</div>
                    <div className="font-bold text-foreground text-base">Total</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div>${Number(form.subtotal).toFixed(2)}</div>
                    <div>${Number(form.taxAmount).toFixed(2)}</div>
                    <div className="font-bold text-foreground text-base">${Number(form.total).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="font-body text-sm">Notes</Label>
                <Input value={form.notes || ''} onChange={e => setField('notes', e.target.value)} className="rounded-xl font-body" placeholder="Any additional notes..." />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body gap-2">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Invoice'}
                </Button>
                <Button variant="outline" onClick={close} className="rounded-xl font-body">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">No invoices yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Invoice #</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Client</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Date</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Total</th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map(inv => (
                  <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{inv.invoiceNumber}</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.clientName}</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.date}</td>
                    <td className="px-5 py-3 font-medium text-foreground">${Number(inv.total || 0).toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[inv.status] || STATUS_COLORS.Draft}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => sendEmail(inv)} disabled={sending === inv.id} className="p-1.5 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors" title={inv.clientEmail ? `Send to ${inv.clientEmail}` : 'No email on file'}>
                          {sending === inv.id ? <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                        <button onClick={() => downloadPDF(inv)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Download PDF"><Download className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(inv)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => remove(inv.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
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