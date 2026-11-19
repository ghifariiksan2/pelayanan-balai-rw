import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sudahDisetujui } from "@/lib/petugas";
import { renderPortal, htmlResponse } from "@/lib/portal";

// Tampilan petugas: hanya untuk akun yang login DAN sudah disetujui admin.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!(await sudahDisetujui(supabase, data.user.id))) {
    return NextResponse.redirect(new URL("/menunggu", request.url));
  }
  return htmlResponse(await renderPortal("petugas"));
}
