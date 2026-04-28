import { createClient } from '@supabase/supabase-js';

// Configure these with your Supabase project credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * MIGRATION REFERENCE
 * 
 * Base44 SDK → Supabase SDK mapping:
 * 
 * base44.entities.Service.list()
 * → supabase.from('Service').select('*')
 * 
 * base44.entities.Service.filter({active: true})
 * → supabase.from('Service').select('*').eq('active', true)
 * 
 * base44.entities.Service.create({title: 'Clean'})
 * → supabase.from('Service').insert({title: 'Clean'})
 * 
 * base44.entities.Service.update(id, {active: false})
 * → supabase.from('Service').update({active: false}).eq('id', id)
 * 
 * base44.entities.Service.delete(id)
 * → supabase.from('Service').delete().eq('id', id)
 * 
 * base44.auth.me()
 * → supabase.auth.getUser()
 * 
 * base44.auth.isAuthenticated()
 * → (await supabase.auth.getSession()).data.session !== null
 */