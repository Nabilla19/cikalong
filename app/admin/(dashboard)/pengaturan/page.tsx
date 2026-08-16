"use client";

import { useEffect, useState } from 'react';
import { dbAction } from '@/app/actions/admin';

export default function PengaturanPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [admins, setAdmins] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    wa: '',
    email: '',
    alamat_kantor: '',
    ig: '',
    tiktok: '',
    teks_footer: ''
  });

  useEffect(() => {
    fetchData();
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      const res = await fetch('/api/admin-users');
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  }

  async function handleDeleteAdmin(id: string) {
    if (!confirm('Yakin ingin menghapus admin ini?')) return;
    try {
      const res = await fetch(`/api/admin-users?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus');
      setAdmins(admins.filter(a => a.id !== id));
      alert('Admin berhasil dihapus');
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await dbAction('pengaturanWeb', 'findUnique', { where: { id: 1 } });
        
      if (data) {
        setFormData({
          wa: data.wa || '',
          email: data.email || '',
          alamat_kantor: data.alamat_kantor || '',
          ig: data.ig || '',
          tiktok: data.tiktok || '',
          teks_footer: data.teks_footer || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const { error } = await dbAction('pengaturanWeb', 'upsert', {
        where: { id: 1 },
        update: formData,
        create: { id: 1, ...formData }
      });
        
      if (error) throw new Error(error);
      setMessage('✅ Berhasil disimpan!');
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('❌ Gagal menyimpan data.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="w-full relative z-10">
      <div className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-inner">
            <span className="text-2xl">⚙️</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Pengaturan & Kontak</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Kelola informasi kontak dan profil desa.</p>
          </div>
        </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Pelayanan</label>
          <input 
            type="text" name="wa" value={formData.wa} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Desa</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Kantor</label>
          <textarea 
            name="alamat_kantor" value={formData.alamat_kantor} onChange={handleChange} rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (Username)</label>
          <input 
            type="text" name="ig" value={formData.ig} onChange={handleChange} placeholder="Contoh: @desacikalongpnd"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">TikTok (Username)</label>
          <input 
            type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} placeholder="Contoh: @desacikalongpnd"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">Teks Footer KKN (PPM)</label>
          <input 
            type="text" name="teks_footer" value={formData.teks_footer} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-6 mt-4 flex items-center gap-4 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-0.5"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          {message && <span className="text-sm font-medium px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg animate-in fade-in">{message}</span>}
        </div>
      </form>
      </div>

      {/* Tambah Admin Section */}
      <div className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-inner">
            <span className="text-xl">👥</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tambah Akun Admin</h2>
            <p className="text-sm text-slate-500 mt-1">Tambahkan email dan password baru agar orang lain bisa masuk.</p>
          </div>
        </div>
        
        <form onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as any;
          const email = target.email.value;
          const password = target.password.value;
          target.submitBtn.disabled = true;
          target.submitBtn.textContent = 'Membuat...';
          
          try {
            const res = await fetch('/api/admin-users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            
            if (!res.ok || data.error) {
              alert('Gagal membuat akun: ' + (data.error || 'Terjadi kesalahan'));
            } else {
              alert('✅ Akun admin baru berhasil dibuat! Mereka sudah bisa menggunakannya untuk login.');
              target.reset();
              fetchAdmins();
            }
          } catch (err) {
            console.error(err);
          } finally {
            target.submitBtn.disabled = false;
            target.submitBtn.textContent = 'Buat Akun Admin';
          }
        }} className="space-y-4 max-w-md bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Baru</label>
            <input 
              type="email" name="email" required placeholder="admin2@cikalong.desa.id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" name="password" required placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button 
            name="submitBtn"
            type="submit" 
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Buat Akun Admin
          </button>
        </form>
      </div>

      {/* Daftar Admin Section */}
      <div className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shadow-inner">
            <span className="text-xl">📋</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Daftar Admin</h2>
        </div>
        
        <div className="bg-white/50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-800 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wide text-xs uppercase">Email</th>
                <th className="px-6 py-4 font-bold tracking-wide text-xs uppercase">Dibuat Pada</th>
                <th className="px-6 py-4 font-bold tracking-wide text-xs uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-white transition-colors duration-200">
                    <td className="px-6 py-5 font-medium text-slate-700">{admin.email}</td>
                    <td className="px-6 py-5">
                      {new Date(admin.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-semibold rounded-lg transition-colors text-xs tracking-wide"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium">Memuat data admin...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
