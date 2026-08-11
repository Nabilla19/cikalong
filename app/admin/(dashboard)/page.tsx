"use client";

import Link from 'next/link';
import { 
  Landmark, 
  Users, 
  Newspaper, 
  Store, 
  Map, 
  Settings,
  ArrowRight
} from 'lucide-react';

export default function AdminDashboard() {
  const cards = [
    { name: 'Sejarah & Visi Misi', path: '/admin/profil', icon: Landmark, color: 'from-blue-400 to-indigo-500', glow: 'group-hover:shadow-blue-500/30' },
    { name: 'Struktur Organisasi', path: '/admin/struktur', icon: Users, color: 'from-violet-400 to-purple-500', glow: 'group-hover:shadow-purple-500/30' },
    { name: 'Berita Desa', path: '/admin/berita', icon: Newspaper, color: 'from-orange-400 to-amber-500', glow: 'group-hover:shadow-orange-500/30' },
    { name: 'Budaya & UMKM', path: '/admin/umkm', icon: Store, color: 'from-pink-400 to-rose-500', glow: 'group-hover:shadow-pink-500/30' },
    { name: 'Geografi', path: '/admin/geografi', icon: Map, color: 'from-emerald-400 to-teal-500', glow: 'group-hover:shadow-emerald-500/30' },
    { name: 'Pengaturan', path: '/admin/pengaturan', icon: Settings, color: 'from-slate-400 to-slate-600', glow: 'group-hover:shadow-slate-500/30' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col gap-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold w-fit mb-2 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Sistem Online
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Admin</span> 👋
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl font-medium mt-2 leading-relaxed">
          Ini adalah pusat kendali website Desa Cikalong. Pilih modul di bawah ini untuk mengelola konten dan memastikan informasi masyarakat selalu terbarui.
        </p>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              href={card.path} 
              key={card.name}
              className={`group relative bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.glow} overflow-hidden flex flex-col items-start min-h-[220px] justify-between`}
            >
              {/* Background gradient decoration */}
              <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${card.color} blur-3xl opacity-10 transition-opacity duration-500 group-hover:opacity-30`} />
              
              <div className="w-full">
                {/* Icon Container */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors leading-tight">{card.name}</h3>
              </div>
              
              {/* Action Link */}
              <div className="mt-4 pt-4 w-full flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-emerald-600 transition-colors border-t border-slate-50">
                <span>Kelola Modul</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
    </div>
  );
}
