import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // Supabase belum diatur: tampilkan pesan, bukan error.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <main className="gate">
        <div className="card">
          <h2>👔 Login Petugas</h2>
          <p className="sub">
            Login petugas belum diaktifkan. Silakan gunakan menu <b>Warga</b> terlebih dahulu.
          </p>
          <a className="back" href="/">← Kembali pilih peran</a>
        </div>
      </main>
    );
  }

  // Kalau petugas sudah login, langsung ke menu petugas.
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/petugas");

  return (
    <main className="gate">
      <div className="card">
        <h2>👔 Masuk sebagai Petugas</h2>
        <p className="sub">Daftar dengan email'mu, lalu tunggu persetujuan admin.</p>
        <LoginForm />
        <a className="back" href="/">← Kembali pilih peran</a>
      </div>
    </main>
  );
}
