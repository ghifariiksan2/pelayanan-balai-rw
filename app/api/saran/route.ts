import { bersihkan } from "@/lib/saran";

// Saran dikirim ke Google Apps Script milik Anda, yang menulisnya ke Google Sheets.
// Alamat script dan kata rahasianya disimpan di environment variable (tidak terlihat pengunjung).

// Pembatas sederhana: maksimal 5 kiriman per 10 menit per alamat IP.
// (Disimpan di memori server, jadi hanya penahan spam ringan.)
const riwayat = new Map<string, number[]>();
function terlaluSering(ip: string) {
  const sekarang = Date.now();
  const baru = (riwayat.get(ip) ?? []).filter((t) => sekarang - t < 10 * 60 * 1000);
  baru.push(sekarang);
  riwayat.set(ip, baru);
  return baru.length > 5;
}

const balas = (status: number, pesan: string) => Response.json({ pesan }, { status });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return balas(400, "Data tidak valid.");
  }

  // Kolom jebakan untuk bot: manusia tidak melihat dan tidak mengisinya.
  if (typeof (body as { website?: unknown })?.website === "string" && (body as { website: string }).website) {
    return balas(200, "Terima kasih!");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "tak-dikenal";
  if (terlaluSering(ip)) return balas(429, "Terlalu sering mengirim. Coba lagi beberapa menit lagi.");

  const hasil = bersihkan(body);
  if (!hasil.ok) return balas(400, hasil.pesan);

  const url = process.env.SARAN_SHEET_URL;
  const token = process.env.SARAN_TOKEN;
  if (!url || !token) return balas(503, "Pengiriman saran belum diaktifkan. Silakan coba lagi nanti.");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...hasil.data, token }),
      redirect: "follow",
    });
    const j = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !j?.ok) return balas(502, "Saran belum bisa terkirim. Silakan coba lagi nanti.");
  } catch {
    return balas(502, "Saran belum bisa terkirim. Silakan coba lagi nanti.");
  }
  return balas(200, "Terima kasih! Saran Anda sudah terkirim.");
}
