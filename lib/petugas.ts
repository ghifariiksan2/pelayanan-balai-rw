import type { SupabaseClient } from "@supabase/supabase-js";

// true kalau akun sudah disetujui admin (kolom petugas.disetujui).
export async function sudahDisetujui(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase
    .from("petugas")
    .select("disetujui")
    .eq("user_id", userId)
    .maybeSingle();
  return data?.disetujui === true;
}
