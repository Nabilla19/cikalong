"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
      const { data, error } = await supabase
        .from('pengaturan_web')
        .select('*')
        .eq('id', 1)
        .single();
        
      if (error) throw error;
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
      const { error } = await supabase
        .from('pengaturan_web')
        .update(formData)
        .eq('id', 1);
        
      if (error) throw error;
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
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">⚙️ Pengaturan & Kontak</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div className="pt-4 flex items-center gap-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          {message && <span className="text-sm font-medium">{message}</span>}
        </div>
      </form>

      {/* Tambah Admin Section */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">👥 Tambah Akun Admin</h2>
        <p className="text-sm text-gray-500 mb-4">Tambahkan email dan password baru agar orang lain bisa masuk ke panel admin ini.</p>
        
        <form onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as any;
          const email = target.email.value;
          const password = target.password.value;
          target.submitBtn.disabled = true;
          target.submitBtn.textContent = 'Membuat...';
          
          try {
            // Gunakan client kedua tanpa persist session agar admin yg sedang login tidak ter-logout
            const { createClient } = await import('@supabase/supabase-js');
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
            const secondClient = createClient(url, key, { auth: { persistSession: false } });
            
            const { error } = await secondClient.auth.signUp({ email, password });
            
            if (error) {
              alert('Gagal membuat akun: ' + error.message);
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
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Buat Akun Admin
          </button>
        </form>
      </div>

      {/* Daftar Admin Section */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">📋 Daftar Admin</h2>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-800">
              <tr>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Dibuat Pada</th>
                <th className="px-6 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4">
                      {new Date(admin.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">Memuat data admin...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
