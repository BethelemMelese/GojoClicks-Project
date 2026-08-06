-- Pay-first booking: transaction ID + receipt proof
-- Run in Supabase → SQL Editor

alter table public.bookings
  add column if not exists payment_transaction_id text;

alter table public.bookings
  add column if not exists payment_proof_url text;
