import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Trash2, Mail, MailOpen } from 'lucide-react';

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => setItems(await base44.entities.ContactMessage.list('-created_date'));
  useEffect(() => { load(); }, []);

  const markRead = async (msg) => {
    if (!msg.read) {
      await base44.entities.ContactMessage.update(msg.id, { read: true });
      await load();
    }
    setSelected(msg);
  };

  const remove = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this message?')) return;
    await base44.entities.ContactMessage.delete(id);
    if (selected?.id === id) setSelected(null);
    await load();
  };

  const unread = items.filter(m => !m.read).length;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-sm font-body text-muted-foreground">
            {items.length} total {unread > 0 && <span className="text-secondary font-semibold">· {unread} unread</span>}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-sm overflow-hidden">
          {items.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground font-body text-sm">No messages yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {items.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => markRead(msg)}
                  className={`w-full text-left px-4 py-4 hover:bg-muted/40 transition-colors ${selected?.id === msg.id ? 'bg-muted/60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {msg.read
                        ? <MailOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        : <Mail className="w-4 h-4 text-secondary flex-shrink-0" />}
                      <span className={`text-sm font-body truncate ${!msg.read ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {msg.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-xs font-body text-muted-foreground">
                        {new Date(msg.created_date).toLocaleDateString()}
                      </span>
                      <button onClick={(e) => remove(msg.id, e)} className="p-1 rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-body text-muted-foreground mt-1 truncate pl-6">{msg.message}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 bg-card rounded-2xl shadow-sm p-6">
          {!selected ? (
            <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground font-body text-sm">
              Select a message to view
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">{selected.name}</h2>
                <p className="text-sm font-body text-muted-foreground">{new Date(selected.created_date).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-body">
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground block mb-0.5">Email</span><a href={`mailto:${selected.email}`} className="text-secondary hover:underline">{selected.email}</a></div>
                {selected.phone && <div><span className="text-xs uppercase tracking-wide text-muted-foreground block mb-0.5">Phone</span><a href={`tel:${selected.phone}`} className="text-foreground">{selected.phone}</a></div>}
                {selected.service && <div><span className="text-xs uppercase tracking-wide text-muted-foreground block mb-0.5">Service</span><span>{selected.service}</span></div>}
                {selected.address && <div><span className="text-xs uppercase tracking-wide text-muted-foreground block mb-0.5">Address</span><span>{selected.address}</span></div>}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground block mb-1">Message</span>
                <p className="text-sm font-body text-foreground leading-relaxed whitespace-pre-wrap bg-muted/40 rounded-xl p-4">{selected.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}