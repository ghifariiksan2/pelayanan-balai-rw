import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pelayanan Balai RW Wonokromo",
  description:
    "Panduan layanan warga Kecamatan Wonokromo, Kota Surabaya: KTP, KK, surat keterangan, izin, bantuan sosial, pendidikan, kesehatan, dan pekerjaan.",
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
