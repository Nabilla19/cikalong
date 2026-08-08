import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Admin Cikalong</h2>
          <p className="text-sm text-slate-400 mt-1">Panel Kendali Website</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            🏠 Dashboard
          </Link>
          <Link href="/admin/profil" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            📖 Sejarah & Visi Misi
          </Link>
          <Link href="/admin/struktur" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            👥 Struktur Organisasi
          </Link>
          <Link href="/admin/berita" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            📰 Berita Desa
          </Link>
          <Link href="/admin/umkm" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            🛍️ Budaya & UMKM
          </Link>
          <Link href="/admin/pengaturan" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            ⚙️ Pengaturan & Kontak
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <Link href="/" className="block w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-center rounded-lg font-medium transition-colors">
            Keluar (Kembali ke Web)
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
