"use client";

import { useEffect, useState, useRef } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newUmkm, setNewUmkm] = useState({ 
    nama_usaha: '', produk: '', pemilik: '', alamat: '', deskripsi: '' 
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
    if (!confirm('Yakin ingin menghapus entri ini?')) return;
    try {
      const { error } = await supabase.from('umkm').delete().eq('id', id);
      if (error) throw error;
      setUmkmList(umkmList.filter(u => u.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data.');
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      let fotoUrl = '';

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `umkm_${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, selectedFile);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
        fotoUrl = data.publicUrl;
      }

      const { data: dbData, error } = await supabase.from('umkm').insert([{ ...newUmkm, foto_url: fotoUrl }]).select();
      if (error) throw error;
      
      if (dbData) {
        setUmkmList([...umkmList, dbData[0]].sort((a, b) => a.nama_usaha.localeCompare(b.nama_usaha)));
        setNewUmkm({ nama_usaha: '', produk: '', pemilik: '', alamat: '', deskripsi: '' });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setMessage('✅ Berhasil ditambahkan!');
      }
    } catch (error: any) {
      console.error('Error adding:', error);
      setMessage(`❌ Gagal menambahkan: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 5000);
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Memuat data...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Form Tambah */}
      <div className="max-w-5xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30 text-white">
            🛍️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">UMKM Desa</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data UMKM yang ada di desa</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Usaha</label>
              <input 
                type="text" required value={newUmkm.nama_usaha} onChange={e => setNewUmkm({...newUmkm, nama_usaha: e.target.value})}
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white outline-none transition-all"
                placeholder="Contoh: Kripik Pisang Bu Ani"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori/Produk Utama</label>
              <input 
                type="text" value={newUmkm.produk} onChange={e => setNewUmkm({...newUmkm, produk: e.target.value})}
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white outline-none transition-all"
                placeholder="Makanan Ringan"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Pemilik/Pengelola</label>
              <input 
                type="text" value={newUmkm.pemilik} onChange={e => setNewUmkm({...newUmkm, pemilik: e.target.value})}
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white outline-none transition-all"
                placeholder="Ibu Ani"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat/Lokasi</label>
              <input 
                type="text" value={newUmkm.alamat} onChange={e => setNewUmkm({...newUmkm, alamat: e.target.value})}
                className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white outline-none transition-all"
                placeholder="Dusun Cikalong RT 01/02"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Lengkap</label>
            <textarea 
              value={newUmkm.deskripsi} onChange={e => setNewUmkm({...newUmkm, deskripsi: e.target.value})} rows={4}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white outline-none transition-all resize-y"
              placeholder="Ceritakan tentang UMKM ini..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Foto (Opsional)</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-100 hover:border-pink-400 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2">📸</span>
                  <p className="mb-1 text-sm text-slate-500 font-semibold"><span className="text-pink-600">Klik untuk memilih file</span> atau seret file ke sini</p>
                  <p className="text-xs text-slate-400">{selectedFile ? selectedFile.name : 'PNG, JPG, JPEG (Max. 5MB)'}</p>
                </div>
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          
          <div className="pt-4 flex items-center gap-4">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-pink-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <><span className="animate-spin text-xl">⌛</span> Mengunggah...</>
              ) : (
                <>Tambahkan Data ✨</>
              )}
            </button>
            {message && (
              <span className={`text-sm font-semibold px-4 py-2 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* List UMKM */}
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <span>📋</span> Direktori UMKM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {umkmList.map((umkm) => (
            <div key={umkm.id} className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-pink-200 transition-all bg-white flex flex-col">
              {umkm.foto_url ? (
                <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                  <img src={umkm.foto_url} alt={umkm.nama_usaha} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-xl text-white line-clamp-1">{umkm.nama_usaha}</h3>
                    <p className="text-xs font-medium text-pink-200">{umkm.produk}</p>
                  </div>
                </div>
              ) : (
                <div className="h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 relative">
                  <span className="text-5xl mb-2">🏪</span>
                  <h3 className="font-bold text-xl text-slate-700 line-clamp-1 text-center">{umkm.nama_usaha}</h3>
                  <p className="text-xs font-medium text-slate-500">{umkm.produk}</p>
                </div>
              )}
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <span>👤</span> <span>{umkm.pemilik || '-'}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                  <span>📍</span> <span className="line-clamp-2">{umkm.alamat || '-'}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => handleDelete(umkm.id)}
                    className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          {umkmList.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Belum ada data UMKM.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
