"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email atau kata sandi salah.");
      setLoading(false);
      return;
    }
    router.push("/petugas");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div className="err" role="alert">{error}</div>}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email" type="email" autoComplete="email" required
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="password">Kata sandi</label>
        <input
          id="password" type="password" autoComplete="current-password" required
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
