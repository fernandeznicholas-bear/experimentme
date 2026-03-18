-- Experiment Me — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Assessment Results table
-- Stores every completed assessment for every user
create table if not exists public.assessment_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  assessment_type text not null,        -- 'swls', 'rosenberg', 'grit', 'mindset'
  score numeric not null,               -- final score (sum or average)
  max_score numeric not null,           -- max possible score for context
  category text not null,               -- e.g. 'Satisfied', 'High Self-Esteem'
  details jsonb default '{}'::jsonb,    -- subscales, raw answers, etc.
  completed_at timestamptz default now() not null,
  created_at timestamptz default now() not null
);

-- Index for fast profile page queries
create index if not exists idx_assessment_results_user_id
  on public.assessment_results(user_id, completed_at desc);

-- Row Level Security (RLS)
-- Users can only see and insert their own results
alter table public.assessment_results enable row level security;

-- Policy: Users can read their own results
create policy "Users can read own results"
  on public.assessment_results for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own results
create policy "Users can insert own results"
  on public.assessment_results for insert
  with check (auth.uid() = user_id);

-- Policy: Users can delete their own results (for data privacy)
create policy "Users can delete own results"
  on public.assessment_results for delete
  using (auth.uid() = user_id);
