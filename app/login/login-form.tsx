"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_LOGIN === "1";

export default function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    const supabase = createClient();

    if (mode === "daftar") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nama },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(
          /already|registered/i.test(error.message)
            ? "Email ini sudah terdaftar. Silakan masuk."
            : "Pendaftaran gagal: " + error.message
        );
        setLoading(false);
        return;
      }
      if (data.session) {
        router.push("/petugas");
        router.refresh();
        return;
      }
      setInfo("Pendaftaran berhasil. Cek email Anda untuk konfirmasi, lalu masuk.");
      setMode("masuk");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email atau kata sandi salah.");
      setLoading(false);
      return;
    }
    router.push("/petugas");
    router.refresh();
  }

  async function masukGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  const daftar = mode === "daftar";

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button type="button" className="btn" onClick={() => setMode("masuk")}
          style={{ opacity: daftar ? 0.5 : 1 }}>Masuk</button>
        <button type="button" className="btn" onClick={() => setMode("daftar")}
          style={{ opacity: daftar ? 1 : 0.5 }}>Daftar</button>
      </div>

      {error && <div className="err" role="alert">{error}</div>}
      {info && <div className="sub" role="status">{info}</div>}

      {daftar && (
        <div className="field">
          <label htmlFor="nama">Nama lengkap</label>
          <input id="nama" type="text" autoComplete="name" required
            value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
      )}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" required
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="password">Kata sandi</label>
        <input id="password" type="password" required minLength={6}
          autoComplete={daftar ? "new-password" : "current-password"}
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Memproses..." : daftar ? "Daftar" : "Masuk"}
      </button>

      {GOOGLE && (
        <button type="button" className="btn" onClick={masukGoogle}
          style={{ marginTop: 10, background: "#fff", color: "#1f2937", border: "1px solid #cbd5e1" }}>
          Masuk dengan Google
        </button>
      )}
    </form>
  );
}
