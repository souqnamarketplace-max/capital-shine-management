/**
 * base44Client.js — Supabase-backed drop-in replacement.
 *
 * This file exports the same `base44` shape every page in this app already
 * imports and calls (base44.entities.X.list(), base44.auth.me(), etc.),
 * but every method is now implemented against Supabase instead of the
 * Base44 SDK. No other file in the app needs to change.
 *
 * Supported surface (matches actual usage across the codebase):
 *   base44.entities.<Table>.list(sortField?, limit?)
 *   base44.entities.<Table>.filter(query, sortField?, limit?)
 *   base44.entities.<Table>.create(data)
 *   base44.entities.<Table>.update(id, data)
 *   base44.entities.<Table>.delete(id)
 *   base44.auth.me()
 *   base44.auth.logout(redirectUrl?)
 *   base44.auth.redirectToLogin(returnUrl?)
 *   base44.functions.invoke(name, payload)
 *   base44.integrations.Core.UploadFile({ file })
 */

import { supabase } from '@/api/supabaseClient';

const TABLES = [
  'Service',
  'Testimonial',
  'BeforeAfterTransformation',
  'Career',
  'ContactMessage',
  'Quote',
  'Invoice',
  'Receipt',
  'SiteSettings',
  'MediaLibrary',
];

/**
 * Applies a Base44-style sort string to a Supabase query.
 * '-created_date' -> order by created_date descending
 * 'sortOrder'      -> order by sortOrder ascending
 */
function applySort(query, sortField) {
  if (!sortField) return query;
  if (sortField.startsWith('-')) {
    return query.order(sortField.slice(1), { ascending: false });
  }
  return query.order(sortField, { ascending: true });
}

function makeEntity(tableName) {
  return {
    /** list(sortField?, limit?) */
    async list(sortField, limit) {
      let q = supabase.from(tableName).select('*');
      q = applySort(q, sortField);
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },

    /** filter(queryObj, sortField?, limit?) */
    async filter(queryObj = {}, sortField, limit) {
      let q = supabase.from(tableName).select('*');
      for (const [col, val] of Object.entries(queryObj)) {
        q = q.eq(col, val);
      }
      q = applySort(q, sortField);
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },

    async create(payload) {
      const { data, error } = await supabase
        .from(tableName)
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async update(id, payload) {
      const { data, error } = await supabase
        .from(tableName)
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async delete(id) {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      return true;
    },
  };
}

const entities = Object.fromEntries(TABLES.map((t) => [t, makeEntity(t)]));

const auth = {
  /** Returns the current user, throws if not authenticated (matches Base44 behavior used in PageNotFound.jsx) */
  async me() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      const err = new Error('Not authenticated');
      err.status = 401;
      throw err;
    }
    const u = data.user;
    return {
      id: u.id,
      email: u.email,
      full_name: u.user_metadata?.full_name ?? u.email,
      // Every authenticated Supabase user in this app is an admin --
      // there is no separate public-signup flow, so role is always 'admin'.
      role: 'admin',
    };
  },

  async isAuthenticated() {
    const { data } = await supabase.auth.getSession();
    return !!data?.session;
  },

  /** logout(redirectUrl?) */
  async logout(redirectUrl) {
    await supabase.auth.signOut();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  },

  /** redirectToLogin(returnUrl?) */
  redirectToLogin(returnUrl = window.location.pathname) {
    window.location.href = `/login?next=${encodeURIComponent(returnUrl)}`;
  },
};

const functions = {
  /**
   * invoke(name, payload) -- calls a Supabase Edge Function by name.
   * Mirrors base44.functions.invoke(name, payload) used for sendClientEmail.
   */
  async invoke(name, payload) {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${name}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Function ${name} failed: ${text}`);
    }

    return res.json();
  },
};

const integrations = {
  Core: {
    /**
     * UploadFile({ file }) -> { file_url }
     * Uploads to the Supabase Storage "media" bucket and returns a public URL,
     * matching the { file_url } shape the app already expects.
     */
    async UploadFile({ file }) {
      const fileName = `${Date.now()}-${file.name}`.replace(/\s+/g, '-');
      const { error } = await supabase.storage
        .from('media')
        .upload(fileName, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage.from('media').getPublicUrl(fileName);
      return { file_url: data.publicUrl };
    },
  },
};

export const base44 = {
  entities,
  auth,
  functions,
  integrations,
};
