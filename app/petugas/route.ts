import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { renderPortal, htmlResponse } from "@/lib/portal";

// Tampilan petugas: hanya untuk yang sudah login.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return htmlResponse(await renderPortal("petugas"));
}
