import { readFile } from "node:fs/promises";
import path from "node:path";

export type Mode = "warga" | "petugas";

// Bagian yang diapit penanda PETUGAS di private/portal.html hanya dikirim ke
// petugas yang sudah login. Untuk warga, bagian itu DIBUANG di server, jadi
// tidak ikut terkirim ke browser sama sekali.
// Penanda ada dua gaya: /*@PETUGAS*/ ... /*@/PETUGAS*/ (di JavaScript)
// dan <!--@PETUGAS--> ... <!--@/PETUGAS--> (di HTML).
const BUKA = String.raw`(?:\/\*|<!--)`;
const TUTUP = String.raw`(?:\*\/|-->)`;
const BLOK_PETUGAS = new RegExp(`${BUKA}@PETUGAS${TUTUP}[\\s\\S]*?${BUKA}@\\/PETUGAS${TUTUP}`, "g");
const PENANDA = new RegExp(`${BUKA}@\\/?PETUGAS${TUTUP}`, "g");

const MENU_USER = (peran: string, aksi: string) => `<details class="umenu">
<summary aria-label="Menu akun">👤</summary>
<div class="umenu-pop"><div class="umwho">Masuk sebagai ${peran}</div>${aksi}</div>
</details>`;

const NAV_WARGA = MENU_USER("Warga", `<a href="/">Ganti peran</a>`);

const NAV_PETUGAS = MENU_USER(
  "Petugas",
  `<form method="post" action="/auth/logout"><button type="submit">Keluar</button></form>`
);

export async function renderPortal(mode: Mode): Promise<string> {
  const file = path.join(process.cwd(), "private", "portal.html");
  let html = await readFile(file, "utf8");

  if (mode === "warga") {
    html = html.replace(BLOK_PETUGAS, "").replace("<!--@NAV-->", NAV_WARGA);
  } else {
    html = html.replace(PENANDA, "").replace("<!--@NAV-->", NAV_PETUGAS);
  }
  return html;
}

export function htmlResponse(html: string): Response {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Isi petugas tidak boleh disimpan di cache bersama.
      "cache-control": "private, no-store",
    },
  });
}
