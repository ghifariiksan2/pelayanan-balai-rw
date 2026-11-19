-- Jalankan sekali di Supabase: SQL Editor -> New query -> tempel -> Run.
-- Daftar petugas: setiap akun baru otomatis tercatat dengan disetujui = false.
-- Admin menyetujui dengan mengubah kolom "disetujui" jadi true di Table Editor.

create table if not exists public.petugas (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  email     text,
  nama      text,
  disetujui boolean not null default false,
  dibuat    timestamptz not null default now()
);

alter table public.petugas enable row level security;

-- Akun hanya boleh membaca baris miliknya sendiri (tidak bisa mengubah).
drop policy if exists "baca_sendiri" on public.petugas;
create policy "baca_sendiri" on public.petugas
  for select to authenticated using (user_id = auth.uid());

create or replace function public.catat_petugas()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.petugas (user_id, email, nama)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nama', new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists saat_akun_baru on auth.users;
create trigger saat_akun_baru after insert on auth.users
  for each row execute function public.catat_petugas();

-- Akun yang sudah ada (mis. yang Anda buat sendiri) ikut dicatat.
insert into public.petugas (user_id, email)
select id, email from auth.users on conflict (user_id) do nothing;
