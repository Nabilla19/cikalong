"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 relative overflow-y-auto overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="flex w-full flex-col lg:flex-row z-10">
        {/* Left Panel: Image Showcase */}
        <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden p-12">
          <div className="absolute inset-0 bg-slate-900 rounded-r-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Desa Cikalong" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/10"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-lg text-white">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl ring-1 ring-white/30">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Sistem Informasi<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm">Desa Cikalong</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-medium">
              Portal manajemen terpadu untuk pengurus desa. Kelola data kependudukan, administrasi, dan layanan masyarakat dengan aman dan modern.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-200 backdrop-blur-md bg-white/10 w-fit px-5 py-3 rounded-full border border-white/10 shadow-lg">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Sistem Terhubung & Aman
            </div>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50">
            <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Selamat Datang</h2>
            <p className="text-slate-500 mb-10 font-medium">Silakan masuk menggunakan akun admin Anda.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <div className="mt-0.5"><ShieldCheck className="w-5 h-5 text-red-500" /></div>
                  <div>
                    <h3 className="font-semibold text-red-700">Otentikasi Gagal</h3>
                    <p className="mt-1">{error}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Alamat Email</label>
                <div className="flex items-center w-full bg-white border border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-2xl shadow-sm transition-all group">
                  <div className="pl-4 pr-3 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-4 pr-5 bg-transparent text-slate-900 placeholder-slate-400 outline-none font-medium"
                    placeholder="admin@cikalong.desa.id"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
                </div>
                <div className="flex items-center w-full bg-white border border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-2xl shadow-sm transition-all group">
                  <div className="pl-4 pr-3 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-4 pr-5 bg-transparent text-slate-900 placeholder-slate-400 outline-none font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="group w-full py-4 mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all disabled:opacity-70 flex items-center justify-center gap-3 transform active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk ke Panel Admin
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm font-medium">
                &copy; {new Date().getFullYear()} Pemerintah Desa Cikalong.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
