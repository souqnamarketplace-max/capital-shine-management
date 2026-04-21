import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';

const DEFAULT_POLICY = `
<h2>Privacy Policy</h2>
<p><strong>Effective Date:</strong> April 2026</p>

<h3>1. Information We Collect</h3>
<p>When you request a quote or contact us, we collect your name, email address, phone number, and service address. We use this information solely to respond to your inquiry and schedule cleaning services.</p>

<h3>2. How We Use Your Information</h3>
<p>We use your information to provide cleaning services, send invoices and receipts, and communicate updates about your bookings. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

<h3>3. Data Security</h3>
<p>Your information is stored securely and accessed only by authorized Capital Shine staff. We take reasonable precautions to protect your data from unauthorized access, disclosure, or loss.</p>

<h3>4. Cookies</h3>
<p>Our website may use basic cookies to improve your browsing experience. These cookies do not collect personally identifiable information and can be disabled in your browser settings.</p>

<h3>5. Third-Party Services</h3>
<p>We may use trusted third-party tools (e.g., email providers) to communicate with you. These providers are contractually obligated to protect your data and may not use it for any other purpose.</p>

<h3>6. Your Rights</h3>
<p>You have the right to request access to, correction of, or deletion of your personal data at any time. To make such a request, please contact us at the email below.</p>

<h3>7. Contact Us</h3>
<p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@capitalshinecleaning.ca">info@capitalshinecleaning.ca</a>.</p>
`;

export default function AdminPrivacyPolicy() {
  const [content, setContent] = useState('');
  const [recordId, setRecordId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) {
        setRecordId(data[0].id);
        setContent(data[0].privacyPolicy || DEFAULT_POLICY);
      } else {
        setContent(DEFAULT_POLICY);
      }
    }
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    if (recordId) {
      await base44.entities.SiteSettings.update(recordId, { privacyPolicy: content });
    } else {
      await base44.entities.SiteSettings.create({ privacyPolicy: content });
    }
    toast.success('Privacy Policy saved!');
    setSaving(false);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-sm font-body text-muted-foreground">Edit the privacy policy shown on your website.</p>
        </div>
        <Button onClick={save} disabled={saving} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl font-body gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Policy'}
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-6">
        <ReactQuill
          value={content}
          onChange={setContent}
          className="font-body min-h-[500px]"
          theme="snow"
          modules={{
            toolbar: [
              [{ header: [2, 3, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'],
              ['clean'],
            ],
          }}
        />
      </div>
    </AdminLayout>
  );
}