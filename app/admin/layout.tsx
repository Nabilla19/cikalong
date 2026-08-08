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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Premium Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-indigo-50 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-slate-800">Cikalong</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Admin Workspace</p>
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
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 mt-auto border-t border-slate-50">
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-medium transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 text-sm">
            <span>🌍</span>
            <span>Lihat Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-screen overflow-y-auto bg-[#f8fafc] pb-24 md:pb-0">
        {/* Decorative background blob */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="p-4 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 pb-safe z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        {menuItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-semibold truncate max-w-[60px] text-center">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
