# Supabase Migration Guide

## Setup Steps

1. **Create Supabase Project**
   - Go to https://supabase.com and create a new project
   - Get your project URL and anon key

2. **Add Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Install Supabase SDK**
   ```bash
   npm install @supabase/supabase-js
   ```

4. **Create Database Tables**
   - Use the entity schemas in `/entities` to create Supabase tables
   - Match column names and types exactly

## Entity Schemas to Migrate

These entities need to be created as Supabase tables:
- `Service`
- `BeforeAfterTransformation`
- `Testimonial`
- `Career`
- `ContactMessage`
- `Quote`
- `Invoice`
- `Receipt`
- `SiteSettings`
- `MediaLibrary`
- `User` (use Supabase auth instead)

## Code Changes Required

### Frontend Pages & Components
Files using `base44.entities.*`:
- `pages/Home.jsx` - Services, Testimonials, BeforeAfter
- `pages/Services.jsx` - Services list
- `pages/ServiceDetail.jsx` - Single service
- `pages/Contact.jsx` - ContactMessage creation
- `pages/Careers.jsx` - Career listings
- `pages/admin/AdminServices.jsx` - CRUD operations
- `pages/admin/AdminQuotes.jsx` - Quote CRUD
- `pages/admin/AdminInvoices.jsx` - Invoice CRUD
- `pages/admin/AdminReceipts.jsx` - Receipt CRUD
- `pages/admin/AdminTestimonials.jsx` - Testimonial CRUD
- `pages/admin/AdminTransformations.jsx` - BeforeAfter CRUD
- `pages/admin/AdminCareers.jsx` - Career CRUD
- `pages/admin/AdminSettings.jsx` - SiteSettings CRUD

### Backend Functions
- `functions/sendClientEmail.js` - Uses Base44 SDK, needs minimal changes

### Hooks
- `hooks/useSiteSettings.js` - Needs Supabase query conversion

## Migration Path

**Phase 1:** Prepare (current)
- ✅ Supabase client setup
- Create tables in Supabase

**Phase 2:** Migrate data
- Export Base44 data as JSON
- Import into Supabase tables

**Phase 3:** Update code
- Replace `base44.entities.*` calls with Supabase SDK
- Update auth calls
- Test all admin CRUD operations

**Phase 4:** Transition
- Deploy updated app to Supabase
- Verify all features work
- Delete from Base44

## Quick Reference

Supabase Client: `api/supabaseClient.js`
See file for SDK mapping examples.