// Validasi dan pembersihan kiriman saran.

export type Saran = {
  jenis: string;
  nama: string;
  kontak: string;
  pesan: string;
  halaman: string;
};

const JENIS = ["Saran", "Masukan", "Laporan kesalahan informasi", "Pertanyaan"];

const potong = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").replace(/\r/g, "").trim().slice(0, max);

export function bersihkan(raw: unknown): { ok: true; data: Saran } | { ok: false; pesan: string } {
  const r = (raw ?? {}) as Record<string, unknown>;
  const pesan = potong(r.pesan, 2000);
  if (pesan.length < 10) return { ok: false, pesan: "Pesan terlalu pendek (minimal 10 karakter)." };

  const jenis = JENIS.includes(r.jenis as string) ? (r.jenis as string) : "Saran";
  return {
    ok: true,
    data: {
      jenis,
      nama: potong(r.nama, 80),
      kontak: potong(r.kontak, 120),
      pesan,
      halaman: potong(r.halaman, 40),
    },
  };
}
