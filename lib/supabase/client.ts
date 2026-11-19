import { createBrowserClient } from "@supabase/ssr";

// Klien Supabase untuk kode yang berjalan di browser (form login).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
