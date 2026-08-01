-- Run in Supabase → SQL Editor if you already created bookings earlier.
-- Makes property fields optional, adds 10_days duration, custom duration text.

alter table public.bookings alter column property_type drop not null;
alter table public.bookings alter column property_location drop not null;
alter table public.bookings alter column price_range drop not null;
alter table public.bookings alter column property_count drop not null;
alter table public.bookings alter column target_audience drop not null;

alter table public.bookings drop constraint if exists bookings_property_type_check;
alter table public.bookings add constraint bookings_property_type_check
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
  );

alter table public.bookings drop constraint if exists bookings_property_count_check;
alter table public.bookings add constraint bookings_property_count_check
  check (property_count is null or property_count > 0);

alter table public.bookings drop constraint if exists bookings_campaign_duration_check;
alter table public.bookings add constraint bookings_campaign_duration_check
  check (
    campaign_duration in (
      '7_days',
      '10_days',
      '15_days',
      '30_days',
      '60_days',
      'custom'
    )
  );

alter table public.bookings
  alter column campaign_duration set default '10_days';

alter table public.bookings
  add column if not exists custom_campaign_duration text;
