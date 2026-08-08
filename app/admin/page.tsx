import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/profil" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-bold text-slate-800">Sejarah & Visi Misi</h3>
          <p className="text-sm text-slate-500 mt-2">Ubah teks sejarah, letak geografis, serta visi dan misi desa.</p>
        </Link>
        
        <Link href="/admin/struktur" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-slate-800">Struktur Organisasi</h3>
          <p className="text-sm text-slate-500 mt-2">Kelola nama dan jabatan perangkat desa.</p>
        </Link>

        <Link href="/admin/berita" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">📰</div>
          <h3 className="text-xl font-bold text-slate-800">Berita Desa</h3>
          <p className="text-sm text-slate-500 mt-2">Tambah, ubah, atau hapus berita dan pengumuman terbaru.</p>
        </Link>

        <Link href="/admin/umkm" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-xl font-bold text-slate-800">Budaya & UMKM</h3>
          <p className="text-sm text-slate-500 mt-2">Kelola galeri foto kebudayaan dan direktori UMKM desa.</p>
        </Link>

        <Link href="/admin/pengaturan" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-xl font-bold text-slate-800">Pengaturan & Kontak</h3>
          <p className="text-sm text-slate-500 mt-2">Ubah nomor WhatsApp, Email, Sosial Media, dan Jam Pelayanan.</p>
        </Link>
      </div>
    </div>
  );
}
