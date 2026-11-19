import Link from "next/link";

export default function Home() {
  return (
    <main className="gate">
      <header className="gate-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Logo Pelayanan Balai RW" width={84} height={84} style={{ borderRadius: 22, marginBottom: 14 }} />
        <br />
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

    </main>
  );
}
