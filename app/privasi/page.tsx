export const metadata = { title: "Kebijakan Privasi — Pelayanan Balai RW Wonokromo" };

export default function PrivasiPage() {
  return (
    <main className="gate">
      <div className="card" style={{ maxWidth: 640 }}>
        <h2>Kebijakan Privasi</h2>
        <p className="sub">Pelayanan Balai RW — Kecamatan Wonokromo, Kota Surabaya</p>

        <h3>Data yang kami simpan</h3>
        <p>
          <b>Warga</b> tidak perlu membuat akun dan tidak ada data pribadi yang disimpan.
          <br />
          <b>Petugas</b> yang mendaftar atau masuk (dengan email atau akun Google) tersimpan:
          nama, alamat email, dan waktu pendaftaran. Dari akun Google kami hanya menerima
          nama dan alamat email.
          <br />
          <b>Saran &amp; Masukan</b> yang dikirim melalui formulir tersimpan di lembar kerja
          (spreadsheet) pengelola: jenis, nama dan kontak (jika diisi), isi pesan, dan waktu kirim.
        </p>

        <h3>Tujuan penggunaan</h3>
        <p>
          Data digunakan hanya untuk mengatur akses petugas ke menu layanan dan untuk menindaklanjuti
          saran dan masukan. Data tidak dijual dan tidak dibagikan kepada pihak lain.
        </p>

        <h3>Penyimpanan dan penghapusan</h3>
        <p>
          Data petugas disimpan pada layanan Supabase, dan saran pada Google Sheets milik pengelola.
          Untuk meminta penghapusan data, hubungi pengelola melalui Kantor Kecamatan Wonokromo.
        </p>

        <a className="back" href="/">← Kembali</a>
      </div>
    </main>
  );
}
