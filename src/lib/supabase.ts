import { createClient } from '@supabase/supabase-js';

// Environment variables for optional Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export interface SupabaseQuoteRow {
  id: string;
  category: string;
  quantity: number;
  finish: string;
  turnaround: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  notes?: string;
  status: 'pending' | 'reviewed' | 'in_production' | 'completed';
  created_at: string;
  user_id?: string;
}

export interface SupabaseUserRow {
  id: string;
  email: string;
  display_name: string;
  role: 'client' | 'admin';
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      quotes: {
        Row: SupabaseQuoteRow;
        Insert: Omit<SupabaseQuoteRow, 'created_at'> & { created_at?: string };
        Update: Partial<SupabaseQuoteRow>;
      };
      users: {
        Row: SupabaseUserRow;
        Insert: Omit<SupabaseUserRow, 'created_at'> & { created_at?: string };
        Update: Partial<SupabaseUserRow>;
      };
    };
  };
}

/**
 * SQL Schema for Supabase PostgreSQL Editor:
 *
 * CREATE TABLE public.quotes (
 *   id TEXT PRIMARY KEY,
 *   category TEXT NOT NULL,
 *   quantity INTEGER NOT NULL DEFAULT 500,
 *   finish TEXT NOT NULL,
 *   turnaround TEXT NOT NULL,
 *   client_name TEXT NOT NULL,
 *   client_email TEXT NOT NULL,
 *   client_phone TEXT,
 *   notes TEXT,
 *   status TEXT NOT NULL DEFAULT 'pending',
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   user_id TEXT
 * );
 *
 * CREATE TABLE public.users (
 *   id TEXT PRIMARY KEY,
 *   email TEXT NOT NULL,
 *   display_name TEXT NOT NULL,
 *   role TEXT NOT NULL DEFAULT 'client',
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 */

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
