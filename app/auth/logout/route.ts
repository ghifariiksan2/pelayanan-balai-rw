import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.redirect(new URL("/", request.url), 303);
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  // 303 supaya browser mengikuti dengan GET.
  return NextResponse.redirect(new URL("/", request.url), 303);
}
