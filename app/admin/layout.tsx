"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: '✨' },
  { name: 'Profil Desa', path: '/admin/profil', icon: '🏛️' },
  { name: 'Struktur Organisasi', path: '/admin/struktur', icon: '👥' },
  { name: 'Berita Desa', path: '/admin/berita', icon: '📰' },
  { name: 'Budaya & UMKM', path: '/admin/umkm', icon: '🛍️' },
  { name: 'Geografi', path: '/admin/geografi', icon: '🗺️' },
  { name: 'Pengaturan & Kontak', path: '/admin/pengaturan', icon: '⚙️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Premium Sidebar */}
      <aside className="w-72 bg-white border-r border-indigo-50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-slate-800">Cikalong</h2>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-0.5">Admin Workspace</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full" />
                )}
                <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 mt-auto border-t border-slate-50">
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-2xl font-medium transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5">
            <span>🌍</span>
            <span>Kembali ke Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area with subtle pattern */}
      <main className="flex-1 relative h-screen overflow-y-auto bg-[#f8fafc]">
        {/* Decorative background blob */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
