import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import AnimatedSection from '../components/AnimatedSection';

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

<p style="margin-top:2rem;font-size:0.85rem;color:#888;">Capital Shine Cleaning Inc. — Edmonton, Alberta, Canada</p>
`;

export default function PrivacyPolicy() {
  const [content, setContent] = useState('');

  useEffect(() => {
    document.title = 'Privacy Policy | Capital Shine Cleaning Inc.';
    async function load() {
      try {
        const data = await base44.entities.SiteSettings.list();
        const policy = data[0]?.privacyPolicy;
        setContent(policy || DEFAULT_POLICY);
      } catch {
        setContent(DEFAULT_POLICY);
      }
    }
    load();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div
            className="prose prose-slate max-w-none font-body [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_a]:text-secondary [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}