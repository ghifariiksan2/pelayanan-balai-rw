import Link from "next/link";

export default function Home() {
  return (
    <main className="gate">
      <header className="gate-head">
        <span className="eyebrow">Kecamatan Wonokromo · Kota Surabaya</span>
        <h1>Pelayanan Balai RW</h1>
        <p>Silakan pilih, Anda masuk sebagai siapa?</p>
      </header>

      <nav className="roles" aria-label="Pilih peran">
        <Link className="role" href="/portal">
          <span className="ico" aria-hidden="true">👥</span>
          <span>
            <b>Saya Warga</b>
            <span className="d">Langsung buka panduan layanan. Tidak perlu akun.</span>
          </span>
          <span className="go" aria-hidden="true">→</span>
        </Link>

        <Link className="role petugas" href="/login">
          <span className="ico" aria-hidden="true">👔</span>
          <span>
            <b>Saya Petugas</b>
            <span className="d">Masuk dengan email dan kata sandi untuk melihat semua menu.</span>
          </span>
          <span className="go" aria-hidden="true">→</span>
        </Link>
      </nav>

      <p className="foot">
        Website ini dibuat oleh Muhammad Ghifari Iksan, S.Tr.IP., M.A.P.
      </p>
    </main>
  );
}
