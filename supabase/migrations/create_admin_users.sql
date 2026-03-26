-- Admin users table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write (no client-side access)
-- This means admin checks must go through server-side API routes

-- Seed with the owner
INSERT INTO admin_users (email, role)
VALUES ('fernandez.nicholas@gmail.com', 'owner')
ON CONFLICT (email) DO NOTHING;
