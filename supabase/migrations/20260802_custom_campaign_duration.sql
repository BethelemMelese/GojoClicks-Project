-- Minimal fix for: Could not find the 'custom_campaign_duration' column
-- Run in Supabase → SQL Editor → New query → Run

alter table public.bookings
  add column if not exists custom_campaign_duration text;

-- Keep duration options in sync with the booking form
alter table public.bookings drop constraint if exists bookings_campaign_duration_check;
alter table public.bookings add constraint bookings_campaign_duration_check
  check (
    campaign_duration in (
      '7_days',
      '10_days',
      '15_days',
      '20_days',
      '30_days',
      '40_days',
      '60_days',
      'custom'
    )
  );
