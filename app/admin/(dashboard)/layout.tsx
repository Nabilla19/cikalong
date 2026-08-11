"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  LayoutDashboard, 
  Landmark, 
  Users, 
  Newspaper, 
  Store, 
  Map, 
  Settings, 
  LogOut, 
  Globe,
  Loader2,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Profil Desa', path: '/admin/profil', icon: Landmark },
  { name: 'Struktur Organisasi', path: '/admin/struktur', icon: Users },
  { name: 'Berita Desa', path: '/admin/berita', icon: Newspaper },
  { name: 'Budaya & UMKM', path: '/admin/umkm', icon: Store },
  { name: 'Geografi', path: '/admin/geografi', icon: Map },
  { name: 'Pengaturan & Kontak', path: '/admin/pengaturan', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setSession(session);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.push('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (!mounted || !session) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
      <p className="text-slate-500 font-medium animate-pulse">Memuat workspace...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Decorative Global Background */}
      <div className="fixed top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>

      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white overflow-hidden shadow-md border border-slate-100">
            <img src="/logo%20cikalong.jpeg" alt="Logo Cikalong" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Cikalong</h2>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-slate-100 text-slate-600 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-[73px] left-4 right-4 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in slide-in-from-top-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-700 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="h-px bg-slate-100 my-2"></div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all text-left">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Keluar</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Premium Sidebar (Desktop) - Floating Design */}
      <aside className="hidden md:flex w-72 flex-col z-20 p-6 h-screen sticky top-0">
        <div className="bg-white/80 backdrop-blur-xl border border-white flex-1 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden">
          
          {/* Brand */}
          <div className="p-8 flex items-center gap-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg shadow-emerald-500/10 flex items-center justify-center relative z-10 ring-2 ring-white overflow-hidden">
              <img src="/logo%20cikalong.jpeg" alt="Logo Cikalong" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-900 to-teal-800 tracking-tight">Cikalong</h2>
              <p className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest mt-0.5">Admin Workspace</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-5 py-2 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 font-bold shadow-sm ring-1 ring-emerald-500/10' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  )}
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-white shadow-sm text-emerald-600' : 'bg-transparent text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100'}`}>
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="text-sm tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Bottom Actions */}
          <div className="p-5 mt-auto border-t border-slate-100 bg-slate-50/50 space-y-3">
            <Link href="/" className="group flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-2xl font-semibold transition-all shadow-sm text-sm">
              <Globe className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              <span>Lihat Website</span>
            </Link>
            <button onClick={handleLogout} className="group flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-red-50/50 hover:bg-red-50 text-red-600 rounded-2xl font-semibold transition-all text-sm border border-transparent hover:border-red-100">
              <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-screen overflow-y-auto bg-transparent z-10">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full pb-32 md:pb-12">
          {children}
        </div>
      </main>

    </div>
  );
}
