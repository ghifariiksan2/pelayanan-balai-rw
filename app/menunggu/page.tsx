import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sudahDisetujui } from "@/lib/petugas";

export const dynamic = "force-dynamic";

export default async function MenungguPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/login");
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  if (await sudahDisetujui(supabase, data.user.id)) redirect("/petugas");

  return (
    <main className="gate">
      <div className="card">
        <h2>⏳ Menunggu persetujuan</h2>
        <p className="sub">
          Akun <b>{data.user.email}</b> sudah terdaftar. Menu petugas akan terbuka setelah
          disetujui admin. Silakan hubungi admin, lalu muat ulang halaman ini.
        </p>
        <a className="btn" href="/petugas" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
          Muat ulang
        </a>
        <form method="post" action="/auth/logout" style={{ marginTop: 10 }}>
          <button className="btn" type="submit" style={{ background: "#64748b" }}>Keluar</button>
        </form>
        <a className="back" href="/portal">Lihat menu Warga →</a>
      </div>
    </main>
  );
}
