"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Umkm = {
  id: string;
  nama_usaha: string;
  produk: string;
  pemilik: string;
  alamat: string;
  deskripsi: string;
  foto_url: string;
};

export default function UmkmPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [umkmList, setUmkmList] = useState<Umkm[]>([]);
  
  const [newUmkm, setNewUmkm] = useState({ 
    nama_usaha: '', produk: '', pemilik: '', alamat: '', deskripsi: '', foto_url: '' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('umkm').select('*').order('nama_usaha', { ascending: true });
      if (error) throw error;
      if (data) setUmkmList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus entri UMKM/Budaya ini?')) return;
    try {
      const { error } = await supabase.from('umkm').delete().eq('id', id);
      if (error) throw error;
      setUmkmList(umkmList.filter(u => u.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data.');
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase.from('umkm').insert([newUmkm]).select();
      if (error) throw error;
      if (data) {
        setUmkmList([...umkmList, data[0]].sort((a, b) => a.nama_usaha.localeCompare(b.nama_usaha)));
        setNewUmkm({ nama_usaha: '', produk: '', pemilik: '', alamat: '', deskripsi: '', foto_url: '' });
        setMessage('✅ Berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Error adding:', error);
      setMessage('❌ Gagal menambahkan.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Memuat data...</div>;

  return (
    <div className="space-y-8">
      {/* Form Tambah */}
      <div className="max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            🛍️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Budaya & UMKM</h1>
            <p className="text-slate-500 text-sm">Kelola daftar usaha lokal dan warisan budaya</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Usaha/Budaya</label>
              <input 
                type="text" required value={newUmkm.nama_usaha} onChange={e => setNewUmkm({...newUmkm, nama_usaha: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori/Produk Utama</label>
              <input 
                type="text" value={newUmkm.produk} onChange={e => setNewUmkm({...newUmkm, produk: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Pemilik/Pengelola</label>
              <input 
                type="text" value={newUmkm.pemilik} onChange={e => setNewUmkm({...newUmkm, pemilik: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat/Lokasi</label>
              <input 
                type="text" value={newUmkm.alamat} onChange={e => setNewUmkm({...newUmkm, alamat: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Lengkap</label>
            <textarea 
              value={newUmkm.deskripsi} onChange={e => setNewUmkm({...newUmkm, deskripsi: e.target.value})} rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Link URL Foto (Opsional)</label>
            <input 
              type="text" value={newUmkm.foto_url} onChange={e => setNewUmkm({...newUmkm, foto_url: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="https://..."
            />
          </div>
          
          <div className="pt-2 flex items-center gap-4">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Tambah Data'}
            </button>
            {message && <span className="text-sm font-medium text-green-600">{message}</span>}
          </div>
        </form>
      </div>

      {/* List UMKM */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Daftar UMKM & Budaya</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold">Nama</th>
                <th className="py-3 px-4 font-semibold">Produk</th>
                <th className="py-3 px-4 font-semibold">Pengelola</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {umkmList.map((umkm) => (
                <tr key={umkm.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800">{umkm.nama_usaha}</td>
                  <td className="py-3 px-4 text-slate-600">{umkm.produk}</td>
                  <td className="py-3 px-4 text-slate-600">{umkm.pemilik}</td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(umkm.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {umkmList.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">Belum ada data.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
