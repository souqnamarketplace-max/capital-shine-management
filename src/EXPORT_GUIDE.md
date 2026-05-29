# Capital Shine Cleaning Inc. — Full Project Export Guide

> This document covers everything needed to run this project independently outside of Base44.

## GitHub Repository

**Repo:** https://github.com/souqnamarketplace-max/capital-shine-management

All source code is synced here. Clone it with:
```bash
git clone https://github.com/souqnamarketplace-max/capital-shine-management.git
cd capital-shine-management
npm install
```

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, shadcn/ui |
| Routing | React Router v6 |
| State / Data | @tanstack/react-query |
| Animations | Framer Motion |
| PDF Generation | jsPDF |
| Email Sending | Resend API |
| Backend Functions | Deno Deploy (via Base44) |
| Database | Base44 (BaaS) — needs to be replaced |
| Auth | Base44 Auth — needs to be replaced |
| File Storage | Base44 Media Storage — needs to be replaced |

---

## 2. Environment Variables / API Keys

### Currently Set (Base44 Secrets)

| Secret Name | Value | Used In |
|---|---|---|
| `RESEND_API_KEY` | *Set in Base44 dashboard* | `functions/sendClientEmail` |

### After Migration — New Variables Needed

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | For backend/server-side operations |
| `RESEND_API_KEY` | Keep the same — for email sending |

---

## 3. Database (Entities / Tables)

All entities currently live in Base44's database. You need to create matching tables in your new backend (e.g. Supabase, PlanetScale, etc.).

### Entity Schemas

#### `Service`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto-generated |
| title | string | Required |
| slug | string | Required, unique URL path |
| shortDescription | string | Required |
| fullDescription | string | Rich text |
| coverImage | string | URL |
| galleryImages | string[] | Array of URLs |
| featuredOnHomepage | boolean | Default: false |
| sortOrder | number | Default: 0 |
| active | boolean | Default: true |
| created_date | timestamp | Auto |
| updated_date | timestamp | Auto |

#### `Testimonial`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | string | Required |
| location | string | |
| review | string | Required |
| rating | number | 1–5, default 5 |
| active | boolean | Default: true |
| created_date | timestamp | Auto |

#### `BeforeAfterTransformation`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| beforeImage | string | Required, URL |
| afterImage | string | Required, URL |
| beforeLabel | string | Default: "Before" |
| afterLabel | string | Default: "After" |
| sortOrder | number | Default: 0 |
| active | boolean | Default: true |

#### `Career`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| title | string | Required |
| description | string | Required |
| requirements | string | |
| location | string | Required |
| type | enum | Full-time / Part-time / Contract / Seasonal |
| active | boolean | Default: true |

#### `ContactMessage`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | string | Required |
| email | string | Required |
| phone | string | |
| service | string | |
| address | string | |
| message | string | Required |
| read | boolean | Default: false |
| created_date | timestamp | Auto |

#### `Quote`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| quoteNumber | string | |
| clientName | string | Required |
| clientEmail | string | |
| clientPhone | string | |
| clientAddress | string | |
| items | jsonb | Array: [{description, quantity, unitPrice}] |
| subtotal | number | |
| taxRate | number | Default: 5 |
| taxAmount | number | |
| total | number | |
| date | string | Required |
| expiryDate | string | |
| notes | string | |
| status | enum | Draft / Sent / Accepted / Declined / Converted |

#### `Invoice`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| invoiceNumber | string | |
| clientName | string | Required |
| clientEmail | string | |
| clientAddress | string | |
| services | jsonb | Array: [{description, quantity, unitPrice}] |
| subtotal | number | |
| taxRate | number | Default: 5 |
| taxAmount | number | |
| total | number | |
| date | string | Required |
| dueDate | string | |
| notes | string | |
| status | enum | Draft / Sent / Paid / Overdue |

#### `Receipt`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| receiptNumber | string | |
| invoiceId | string | FK → Invoice (optional) |
| clientName | string | Required |
| clientEmail | string | |
| services | jsonb | Array: [{description, quantity, unitPrice}] |
| subtotal | number | |
| taxRate | number | Default: 5 |
| taxAmount | number | |
| total | number | |
| date | string | Required |
| paymentMethod | enum | Cash / Credit Card / E-Transfer / Cheque / Other |
| notes | string | |

#### `SiteSettings`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| companyName | string | Required |
| phone | string | Required |
| email | string | Required |
| address | string | |
| city | string | |
| province | string | |
| postalCode | string | |
| logo | string | URL |
| privacyPolicy | string | HTML content |
| businessHours | jsonb | {monday, tuesday, …, sunday} |
| socialLinks | jsonb | {facebook, instagram, linkedin, google} |
| announcementBar | jsonb | {text, active, link} |

#### `MediaLibrary`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| title | string | Required |
| imageUrl | string | Required |
| altText | string | |
| category | enum | Hero / Services / About / Gallery / Team / Other |

---

## 4. Backend Functions

### `sendClientEmail` (Deno)

**File:** `functions/sendClientEmail.js`

**Purpose:** Generates a PDF (invoice / receipt / quote) and emails it to the client via Resend.

**Runtime:** Deno Deploy

**Dependencies:**
- `npm:@base44/sdk@0.8.25` — auth & DB access (replace with your auth + Supabase)
- `npm:jspdf@2.5.1` — PDF generation (keep as-is)
- Resend REST API — email sending (keep as-is)

**Inputs (JSON body):**
```json
{
  "to": "client@email.com",
  "subject": "Your Invoice #001",
  "attachmentData": {
    "docType": "INVOICE",
    "docNumber": "INV-001",
    "clientName": "John Doe",
    "clientEmail": "client@email.com",
    "clientAddress": "123 Main St",
    "date": "2026-05-28",
    "secondaryDateLabel": "Due Date",
    "secondaryDate": "2026-06-28",
    "items": [{ "description": "Deep Clean", "quantity": 1, "unitPrice": 250 }],
    "subtotal": 250,
    "taxRate": 5,
    "taxAmount": 12.5,
    "total": 262.5,
    "totalLabel": "Total Due",
    "notes": "Thank you for your business"
  },
  "attachmentFilename": "Invoice-INV-001.pdf"
}
```

**What to change after migration:**
- Replace `createClientFromRequest` + `base44.auth.me()` with your own auth check
- Replace `base44.asServiceRole.entities.SiteSettings.list()` with a Supabase query:
  ```js
  const { data: settings } = await supabase.from('SiteSettings').select('*').limit(1);
  ```
- Keep the Resend API call and jsPDF logic — they are fully portable

**Called from frontend via:**
```js
await base44.functions.invoke('sendClientEmail', { to, subject, attachmentData, attachmentFilename })
```
→ After migration, call your deployed function URL directly with `fetch()`.

---

## 5. Authentication

### Current (Base44)
- Handled entirely by Base44 platform
- `base44.auth.me()` → returns current user `{ id, email, full_name, role }`
- `base44.auth.isAuthenticated()` → boolean
- `base44.auth.redirectToLogin(nextUrl)` → redirects to Base44 login page
- `base44.auth.logout(redirectUrl)` → logs out
- Role-based access: `user.role === 'admin'` guards all admin routes

### After Migration — Replace With
- **Supabase Auth** (recommended): `supabase.auth.getUser()`, `supabase.auth.signIn()`, `supabase.auth.signOut()`
- Or any JWT-based auth provider (Auth0, Clerk, Firebase Auth, etc.)

**Files that use auth (need updating):**
- `lib/AuthContext.jsx` — full auth state management
- `components/AdminRoute.jsx` — route guard
- `components/ProtectedRoute.jsx` — route guard
- `functions/sendClientEmail.js` — verifies user on server side

---

## 6. File / Image Storage

### Current
- Images uploaded via `base44.integrations.Core.UploadFile({ file })` → returns a `file_url`
- Images hosted at `media.base44.com`

### After Migration
- Use **Supabase Storage**, **Cloudinary**, **AWS S3**, or **Uploadthing**
- Update image upload logic in `pages/admin/AdminMedia.jsx` and anywhere `UploadFile` is called
- Company logo in emails (`sendClientEmail`) references a `media.base44.com` URL — update to your new storage URL

---

## 7. Frontend SDK Calls — Full Replacement Map

### Data (Entities)

| Current (Base44) | Supabase Equivalent |
|---|---|
| `base44.entities.X.list()` | `supabase.from('X').select('*')` |
| `base44.entities.X.filter({k:v})` | `supabase.from('X').select('*').eq('k', v)` |
| `base44.entities.X.create(data)` | `supabase.from('X').insert(data)` |
| `base44.entities.X.update(id, data)` | `supabase.from('X').update(data).eq('id', id)` |
| `base44.entities.X.delete(id)` | `supabase.from('X').delete().eq('id', id)` |
| `base44.entities.X.schema()` | N/A — define schema manually |

### Auth

| Current (Base44) | Supabase Equivalent |
|---|---|
| `base44.auth.me()` | `supabase.auth.getUser()` |
| `base44.auth.isAuthenticated()` | `!!(await supabase.auth.getSession()).data.session` |
| `base44.auth.redirectToLogin(next)` | Navigate to your `/login` route |
| `base44.auth.logout(url)` | `supabase.auth.signOut()` then navigate |
| `base44.auth.updateMe(data)` | `supabase.from('profiles').update(data).eq('id', user.id)` |

### Functions

| Current (Base44) | After Migration |
|---|---|
| `base44.functions.invoke('sendClientEmail', payload)` | `fetch('https://your-function-url', { method:'POST', body: JSON.stringify(payload) })` |

### Integrations (LLM / File Upload)

| Current (Base44) | After Migration |
|---|---|
| `base44.integrations.Core.UploadFile({ file })` | Supabase Storage / S3 upload |
| `base44.integrations.Core.InvokeLLM(...)` | OpenAI / Anthropic API directly |

---

## 8. Pages & Components Overview

### Public Pages
| Route | File | Data Used |
|---|---|---|
| `/` | `pages/Home.jsx` | Services, Testimonials, BeforeAfterTransformation, SiteSettings |
| `/services` | `pages/Services.jsx` | Service |
| `/services/:slug` | `pages/ServiceDetail.jsx` | Service (single) |
| `/about` | `pages/About.jsx` | SiteSettings |
| `/contact` | `pages/Contact.jsx` | ContactMessage (create), SiteSettings |
| `/careers` | `pages/Careers.jsx` | Career, SiteSettings |
| `/privacy-policy` | `pages/PrivacyPolicy.jsx` | SiteSettings |

### Admin Pages (require `role === 'admin'`)
| Route | File | Data Used |
|---|---|---|
| `/admin` | `pages/Admin.jsx` | All entities (counts) |
| `/admin/services` | `pages/admin/AdminServices.jsx` | Service |
| `/admin/transformations` | `pages/admin/AdminTransformations.jsx` | BeforeAfterTransformation |
| `/admin/testimonials` | `pages/admin/AdminTestimonials.jsx` | Testimonial |
| `/admin/careers` | `pages/admin/AdminCareers.jsx` | Career |
| `/admin/settings` | `pages/admin/AdminSettings.jsx` | SiteSettings |
| `/admin/quotes` | `pages/admin/AdminQuotes.jsx` | Quote + sendClientEmail |
| `/admin/invoices` | `pages/admin/AdminInvoices.jsx` | Invoice + sendClientEmail |
| `/admin/receipts` | `pages/admin/AdminReceipts.jsx` | Receipt + sendClientEmail |
| `/admin/media` | `pages/admin/AdminMedia.jsx` | MediaLibrary + UploadFile |
| `/admin/messages` | `pages/admin/AdminMessages.jsx` | ContactMessage |
| `/admin/privacy-policy` | `pages/admin/AdminPrivacyPolicy.jsx` | SiteSettings |

### Key Shared Components
- `components/Layout.jsx` — wraps all public pages (Navbar + Footer)
- `components/AdminLayout.jsx` — wraps all admin pages (sidebar nav)
- `components/Header.jsx` — public navbar, reads SiteSettings
- `components/Footer.jsx` — public footer, reads SiteSettings
- `hooks/useSiteSettings.js` — fetches SiteSettings, used everywhere
- `lib/AuthContext.jsx` — global auth state provider

---

## 9. Migration Steps (Recommended Order)

1. **Export all data** from Base44 dashboard (JSON export per entity)
2. **Create Supabase project** → create all tables from Section 3
3. **Import data** into Supabase tables
4. **Replace auth** in `lib/AuthContext.jsx` and route guards
5. **Replace `base44.entities.*`** calls in all pages (see Section 7)
6. **Redeploy `sendClientEmail`** to Deno Deploy or any Node/Deno runtime
7. **Update file upload** in `AdminMedia.jsx` to use new storage provider
8. **Update logo URL** in `sendClientEmail` email template
9. **Set env vars** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `RESEND_API_KEY`)
10. **Remove Base44 dependencies** (`@base44/sdk`, `api/base44Client.js`, `lib/AuthContext.jsx`)
11. **Test all pages and admin functions**
12. **Deploy** (Vercel, Netlify, Cloudflare Pages, etc.)

---

## 10. External Services Summary

| Service | Purpose | Portable? |
|---|---|---|
| **Resend** | Transactional email (invoices, receipts, quotes) | ✅ Yes — just keep the API key |
| **Google Fonts** | Inter + Playfair Display fonts | ✅ Yes — already in `index.css` |
| **Unsplash** | Stock photos (some pages) | ✅ Yes — just URLs |
| **Base44 Media CDN** | Hosted images (logo, etc.) | ⚠️ Re-upload to your storage |
| **Base44 Auth** | Login / sessions | ❌ Replace with Supabase Auth |
| **Base44 DB** | All entity data | ❌ Replace with Supabase/Postgres |
| **Base44 Functions** | Deno serverless backend | ❌ Redeploy to Deno Deploy / Vercel |

---

*Generated: 2026-05-28 | Capital Shine Cleaning Inc.*