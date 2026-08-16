"use client";

import { useEffect, useState, useRef } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [newBerita, setNewBerita] = useState({ judul: '', isi: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      // Upload file jika ada
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, selectedFile);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
        fotoUrl = data.publicUrl;
      }

      const { data: dbData, error } = await supabase.from('berita').insert([{ ...newBerita, foto_url: fotoUrl }]).select();
      if (error) throw error;
      
      if (dbData) {
        setBeritaList([dbData[0], ...beritaList]);
        setNewBerita({ judul: '', isi: '' });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setMessage('✅ Berita berhasil diterbitkan!');
      }
    } catch (error: any) {
      console.error('Error adding:', error);
      setMessage(`❌ Gagal menambahkan: ${error.message || 'Error tidak diketahui'}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 5000);
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Memuat data berita...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Form Tambah */}
      <div className="max-w-4xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-500/30 text-white">
            📰
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tulis Berita</h1>
            <p className="text-slate-500 text-sm mt-1">Publikasikan informasi terbaru untuk warga desa</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Berita</label>
            <input 
              type="text" required value={newBerita.judul} onChange={e => setNewBerita({...newBerita, judul: e.target.value})}
              className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white outline-none transition-all"
              placeholder="Contoh: Kerja Bakti Massal Desa Cikalong..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Berita</label>
            <textarea 
              required value={newBerita.isi} onChange={e => setNewBerita({...newBerita, isi: e.target.value})} rows={6}
              className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white outline-none transition-all resize-y"
              placeholder="Tulis selengkapnya di sini..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Foto (Opsional)</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-100 hover:border-orange-400 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2">📸</span>
                  <p className="mb-1 text-sm text-slate-500 font-semibold"><span className="text-orange-600">Klik untuk memilih file</span> atau seret file ke sini</p>
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
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <><span className="animate-spin text-xl">⌛</span> Mengunggah...</>
              ) : (
                <>Terbitkan Berita 🚀</>
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

      {/* List Berita */}
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>📚</span> Arsip Berita
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {beritaList.map((berita) => (
            <div key={berita.id} className="group border border-slate-100 p-5 rounded-2xl hover:shadow-xl hover:shadow-slate-200/50 hover:border-orange-200 transition-all bg-white flex gap-4">
              {berita.foto_url ? (
                <div className="w-32 h-32 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden shadow-inner">
                  <img src={berita.foto_url} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center text-4xl shadow-inner">
                  🖼️
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors">{berita.judul}</h3>
                <p className="text-xs font-medium text-orange-500 mb-2">{new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                <p className="text-sm text-slate-500 line-clamp-3 mb-3 whitespace-pre-wrap text-left">{berita.isi}</p>
                <div className="mt-auto flex justify-end">
                  <button 
                    onClick={() => handleDelete(berita.id)}
                    className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          {beritaList.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Belum ada berita yang diterbitkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
