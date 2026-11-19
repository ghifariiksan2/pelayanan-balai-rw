import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // Kalau petugas sudah login, langsung ke menu petugas.
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/petugas");

  return (
    <main className="gate">
      <div className="card">
        <h2>👔 Masuk sebagai Petugas</h2>
        <p className="sub">Gunakan email dan kata sandi yang diberikan admin.</p>
        <LoginForm />
        <a className="back" href="/">← Kembali pilih peran</a>
      </div>
    </main>
  );
}
