-- Migration: Allow anonymous assessment results (user_id nullable)
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Drop the NOT NULL constraint on user_id
-- (keeps the FK reference so logged-in results still cascade on user delete)
ALTER TABLE public.assessment_results
  ALTER COLUMN user_id DROP NOT NULL;

-- 2. Add an index for querying anonymous results
CREATE INDEX IF NOT EXISTS idx_assessment_results_anonymous
  ON public.assessment_results(completed_at DESC)
  WHERE user_id IS NULL;
