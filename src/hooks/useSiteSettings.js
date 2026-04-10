import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const DEFAULT_SETTINGS = {
  companyName: 'Capital Shine Cleaning Inc.',
  phone: '(780) 000-0000',
  email: 'info@capitalshinecleaning.ca',
  address: 'Edmonton',
  city: 'Edmonton',
  province: 'Alberta',
  postalCode: '',
  logo: '',
  socialLinks: {},
  announcementBar: { text: '', active: false, link: '' },
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await base44.entities.SiteSettings.list();
        if (data.length > 0) {
          setSettings({ ...DEFAULT_SETTINGS, ...data[0] });
        }
      } catch (e) {
        // fallback to defaults
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { settings, loading };
}