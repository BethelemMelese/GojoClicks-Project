-- GojoClicks bookings table
-- Run in Supabase → SQL Editor → New query → paste → Run

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'cancelled')),

  -- Package snapshot (from /packages/[slug])
  package_id text not null,
  package_slug text,
  package_title text,
  amount numeric(12, 2),

  -- 1. Personal Information
  full_name text not null,
  phone text not null,
  whatsapp_number text not null,
  email text not null,
  company_name text,
  city_area text not null,

  -- 2. Advertising Platform
  ad_platform text not null
    check (ad_platform in ('gojoclicks', 'own_page', 'both')),
  facebook_page_url text,
  instagram_page_url text,
  meta_business_access text
    check (
      meta_business_access is null
      or meta_business_access in ('yes', 'no', 'not_sure')
    ),

  -- 3. Lead Delivery
  lead_delivery_method text not null
    check (
      lead_delivery_method in (
        'whatsapp',
        'phone_calls',
        'messenger',
        'instagram_dm',
        'email',
        'dashboard'
      )
    ),
  leads_whatsapp_number text,

  -- 4. Property Information (optional)
  property_type text
    check (
      property_type is null
      or property_type in (
        'apartment',
        'villa_house',
        'condominium',
        'commercial',
        'land',
        'office',
        'other'
      )
    ),
  property_location text,
  price_range text,
  property_count integer check (property_count is null or property_count > 0),
  target_audience text,

  -- 6. Budget & duration
  include_ad_budget boolean not null default false,
  desired_ad_budget text,
  campaign_duration text not null default '10_days'
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
    ),
  custom_campaign_duration text,

  -- 7. Content Submission (+ Cloudinary uploads)
  has_content_ready text not null
    check (has_content_ready in ('yes', 'needs_creation')),
  external_content_url text,
  ad_language text not null
    check (ad_language in ('amharic', 'english', 'both')),
  video_url text,
  image_urls jsonb not null default '[]'::jsonb,
  logo_url text,

  -- 8. Goals (no target number of leads)
  goals text[] not null default '{}',

  -- 9. Notes + Agreement
  additional_notes text,
  terms_accepted boolean not null default false,
  terms_accepted_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint bookings_terms_accepted_true check (terms_accepted = true)
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_email_idx on public.bookings (email);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_package_slug_idx on public.bookings (package_slug);

create or replace function public.set_bookings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row
  execute function public.set_bookings_updated_at();

-- Lock down direct client access. API routes use the service role key (bypasses RLS).
alter table public.bookings enable row level security;

drop policy if exists "Service role full access to bookings" on public.bookings;
-- No anon/authenticated policies on purpose: public clients cannot read/write bookings.
