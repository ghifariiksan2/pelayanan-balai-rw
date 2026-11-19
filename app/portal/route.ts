import { renderPortal, htmlResponse } from "@/lib/portal";

// Tampilan warga: terbuka untuk siapa saja, tanpa akun.
export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(await renderPortal("warga"));
}
