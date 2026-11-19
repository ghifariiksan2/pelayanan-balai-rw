# Pelayanan Balai RW Wonokromo

Next.js + Supabase, dipasang di Vercel.

## Cara kerja
- `/` : pilih peran (Warga / Petugas)
- `/portal` : menu warga, tanpa akun
- `/login` : login petugas (email + kata sandi)
- `/petugas` : menu lengkap, hanya untuk petugas yang sudah login

Isi panduan ada di `private/portal.html`. Bagian yang diapit
`/*@PETUGAS*/ ... /*@/PETUGAS*/` hanya dikirim ke petugas. Untuk warga, bagian itu
dibuang di server, jadi tidak bisa diintip lewat "View source".

## Menambah konten khusus petugas
Apit entri layanan (atau subbagian) dengan penanda di atas. Contoh:

    /*@PETUGAS*/
     {id:"contoh", g:"petugas", ...},
    /*@/PETUGAS*/

## Pengaturan Supabase (sekali saja)
1. supabase.com > New project.
2. Authentication > Sign In / Providers > Email: matikan **Allow new users to sign up**
   (supaya warga tidak bisa mendaftar sendiri).
3. Authentication > Users > Add user > Create new user: isi email + kata sandi petugas,
   centang **Auto Confirm User**.
4. Project Settings > API: salin **Project URL** dan **anon public key**.

## Environment variable
Isi di Vercel (Project > Settings > Environment Variables), lalu Redeploy:

    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY

Untuk uji di komputer: salin `.env.example` menjadi `.env.local`, isi, lalu `npm install` dan `npm run dev`.

## Saran & Masukan ke Google Sheets
Kiriman dari menu **Saran & Masukan** ditulis otomatis ke spreadsheet
"Saran & Masukan - Pelayanan Balai RW" di Google Drive. Pasang sekali saja:

1. Buka spreadsheet itu, klik **Ekstensi > Apps Script**.
2. Hapus isi editor, tempel isi file `apps-script/saran.gs`.
3. Ganti `GANTI-DENGAN-KATA-RAHASIA` dengan kata rahasia buatan Anda, lalu simpan.
4. Klik **Deploy > Deployment baru > jenis: Aplikasi web**.
   Jalankan sebagai: **Saya**. Yang memiliki akses: **Siapa saja**. Klik **Deploy**, izinkan akses, lalu salin **URL aplikasi web**.
5. Di Vercel (Settings > Environment Variables) isi:
   `SARAN_SHEET_URL` = URL tadi, `SARAN_TOKEN` = kata rahasia yang sama. Lalu Redeploy.
