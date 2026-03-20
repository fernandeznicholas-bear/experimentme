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

-- ─── User Demographics ────────────────────────────────────────
-- Stores demographic info for research context and population norms

create table if not exists public.user_demographics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,

  -- Quick demographics (3 questions asked after first assessment)
  age_range text,             -- '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
  gender text,                -- 'male', 'female', 'non-binary', 'prefer-not-to-say', 'self-describe'
  gender_self_describe text,  -- free text if gender = 'self-describe'
  education text,             -- 'high-school', 'some-college', 'bachelors', 'masters', 'doctorate', 'other'

  -- Extended demographics (optional, in profile settings)
  ethnicity text,             -- 'white', 'black', 'hispanic-latino', 'asian', 'native-american', 'pacific-islander', 'multiracial', 'other', 'prefer-not-to-say'
  country text,               -- ISO 3166-1 alpha-2 code (e.g., 'US', 'GB', 'AU')
  employment_status text,     -- 'employed-full', 'employed-part', 'self-employed', 'student', 'retired', 'unemployed', 'other'
  relationship_status text,   -- 'single', 'in-relationship', 'married', 'divorced', 'widowed', 'prefer-not-to-say'
  household_income text,      -- 'under-25k', '25k-50k', '50k-75k', '75k-100k', '100k-150k', '150k+', 'prefer-not-to-say'

  quick_completed boolean default false,    -- true after 3-question quick ask
  extended_completed boolean default false,  -- true after extended demographics

  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for fast lookups
create index if not exists idx_user_demographics_user_id
  on public.user_demographics(user_id);

-- Row Level Security
alter table public.user_demographics enable row level security;

create policy "Users can read own demographics"
  on public.user_demographics for select
  using (auth.uid() = user_id);

create policy "Users can insert own demographics"
  on public.user_demographics for insert
  with check (auth.uid() = user_id);

create policy "Users can update own demographics"
  on public.user_demographics for update
  using (auth.uid() = user_id);

-- ─── Research Consent ───────────────────────────────────────
-- Tracks user consent for anonymous data sharing with researchers
-- Consent is explicit opt-in, granular (per-assessment or global), and revocable

create table if not exists public.research_consent (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  assessment_type text,          -- null = global consent for all assessments; 'swls', 'grit', etc. = per-assessment
  consented boolean not null default false,
  consented_at timestamptz,      -- when they opted in
  revoked_at timestamptz,        -- when they opted out (null if still active)
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  -- One consent record per user per scope (global or specific assessment)
  unique(user_id, assessment_type)
);

create index if not exists idx_research_consent_user_id
  on public.research_consent(user_id);

alter table public.research_consent enable row level security;

create policy "Users can read own consent"
  on public.research_consent for select
  using (auth.uid() = user_id);

create policy "Users can insert own consent"
  on public.research_consent for insert
  with check (auth.uid() = user_id);

create policy "Users can update own consent"
  on public.research_consent for update
  using (auth.uid() = user_id);
