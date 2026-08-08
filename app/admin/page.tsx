"use client";

import Link from 'next/link';

export default function AdminDashboard() {
  const cards = [
    { name: 'Sejarah & Visi Misi', path: '/admin/profil', icon: '🏛️', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', hover: 'hover:shadow-blue-500/20' },
    { name: 'Struktur Organisasi', path: '/admin/struktur', icon: '👥', color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100', hover: 'hover:shadow-indigo-500/20' },
    { name: 'Berita Desa', path: '/admin/berita', icon: '📰', color: 'bg-orange-50 text-orange-600', border: 'border-orange-100', hover: 'hover:shadow-orange-500/20' },
    { name: 'Budaya & UMKM', path: '/admin/umkm', icon: '🛍️', color: 'bg-pink-50 text-pink-600', border: 'border-pink-100', hover: 'hover:shadow-pink-500/20' },
    { name: 'Geografi', path: '/admin/geografi', icon: '🗺️', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', hover: 'hover:shadow-emerald-500/20' },
    { name: 'Pengaturan', path: '/admin/pengaturan', icon: '⚙️', color: 'bg-slate-50 text-slate-600', border: 'border-slate-200', hover: 'hover:shadow-slate-500/20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Selamat Datang 👋</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Ini adalah pusat kendali website Desa Cikalong. Pilih modul di bawah ini untuk mengelola konten yang akan ditampilkan kepada masyarakat luas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link 
            href={card.path} 
            key={card.name}
            className={`group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border ${card.border} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.hover} overflow-hidden flex flex-col items-start`}
          >
            {/* Background decoration */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-60 ${card.color.split(' ')[0]}`} />
            
            <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center text-3xl mb-6 shadow-inner transition-transform group-hover:scale-110 duration-300`}>
              {card.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">{card.name}</h3>
            
            <div className="mt-auto pt-6 flex items-center text-sm font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
              <span>Kelola modul</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
