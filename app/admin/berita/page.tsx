"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Berita = {
  id: string;
  judul: string;
  isi: string;
  foto_url: string;
  diterbitkan_pada: string;
};

export default function BeritaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  
  const [newBerita, setNewBerita] = useState({ judul: '', isi: '', foto_url: '' });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('berita').select('*').order('diterbitkan_pada', { ascending: false });
      if (error) throw error;
      if (data) setBeritaList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;
    try {
      const { error } = await supabase.from('berita').delete().eq('id', id);
      if (error) throw error;
      setBeritaList(beritaList.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus berita.');
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase.from('berita').insert([newBerita]).select();
      if (error) throw error;
      if (data) {
        setBeritaList([data[0], ...beritaList]);
        setNewBerita({ judul: '', isi: '', foto_url: '' });
        setMessage('✅ Berita berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Error adding:', error);
      setMessage('❌ Gagal menambahkan berita.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Memuat data berita...</div>;

  return (
    <div className="space-y-8">
      {/* Form Tambah */}
      <div className="max-w-3xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            📰
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Berita Desa</h1>
            <p className="text-slate-500 text-sm">Tulis dan terbitkan berita terbaru</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Berita</label>
            <input 
              type="text" required value={newBerita.judul} onChange={e => setNewBerita({...newBerita, judul: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Masukkan judul berita..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Isi Berita</label>
            <textarea 
              required value={newBerita.isi} onChange={e => setNewBerita({...newBerita, isi: e.target.value})} rows={5}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-y"
              placeholder="Tulis isi berita selengkapnya..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Link URL Foto Utama (Opsional)</label>
            <input 
              type="text" value={newBerita.foto_url} onChange={e => setNewBerita({...newBerita, foto_url: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="https://..."
            />
          </div>
          
          <div className="pt-2 flex items-center gap-4">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Menerbitkan...' : 'Terbitkan Berita'}
            </button>
            {message && <span className="text-sm font-medium text-green-600">{message}</span>}
          </div>
        </form>
      </div>

      {/* List Berita */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Daftar Berita</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beritaList.map((berita) => (
            <div key={berita.id} className="border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-2">{berita.judul}</h3>
              <p className="text-xs text-slate-500 mb-3">{new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
              <p className="text-sm text-slate-600 line-clamp-3 mb-4">{berita.isi}</p>
              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button 
                  onClick={() => handleDelete(berita.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Hapus Berita
                </button>
              </div>
            </div>
          ))}
          {beritaList.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-500">Belum ada berita yang diterbitkan.</div>
          )}
        </div>
      </div>
    </div>
  );
}
