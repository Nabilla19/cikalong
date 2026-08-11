"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Budaya = {
  id: string;
  judul: string;
  deskripsi: string;
  foto_url: string;
  dibuat_pada: string;
};

export default function BudayaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [budayaList, setBudayaList] = useState<Budaya[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [newBudaya, setNewBudaya] = useState({ 
    judul: '', 
    deskripsi: '' 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('budaya').select('*').order('judul', { ascending: true });
      if (error) throw error;
      if (data) setBudayaList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data budaya ini?')) return;
    try {
      const { error } = await supabase.from('budaya').delete().eq('id', id);
      if (error) throw error;
      setBudayaList(budayaList.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data budaya.');
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
        const fileName = `budaya_${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, selectedFile);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
        fotoUrl = data.publicUrl;
      }

      const { data: dbData, error } = await supabase.from('budaya').insert([{ ...newBudaya, foto_url: fotoUrl }]).select();
      if (error) throw error;
      
      if (dbData) {
        setBudayaList([...budayaList, dbData[0]].sort((a, b) => a.judul.localeCompare(b.judul)));
        setNewBudaya({ judul: '', deskripsi: '' });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setMessage('✅ Berhasil ditambahkan!');
      }
    } catch (error: any) {
      console.error('Error adding:', error);
      setMessage(`❌ Gagal menambahkan: ${error.message || 'Error tidak diketahui'}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 5000);
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Memuat data budaya...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Form Tambah */}
      <div className="max-w-4xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-100 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-fuchsia-500/30 text-white">
            🎭
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Aktivitas & Budaya Desa</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data kebudayaan dan kearifan lokal desa</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Budaya / Tradisi</label>
            <input 
              type="text" required value={newBudaya.judul} onChange={e => setNewBudaya({...newBudaya, judul: e.target.value})}
              className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 focus:bg-white outline-none transition-all"
              placeholder="Contoh: Tradisi Babarit"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Foto Budaya</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-100 hover:border-fuchsia-400 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📸</span>
                  <p className="mb-1 text-sm text-slate-500 font-semibold"><span className="text-fuchsia-600">Klik untuk memilih file</span> atau seret file ke sini</p>
                  <p className="text-xs text-slate-400">{selectedFile ? selectedFile.name : 'PNG, JPG, JPEG (Max. 5MB)'}</p>
                </div>
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Budaya</label>
            <textarea 
              value={newBudaya.deskripsi} onChange={e => setNewBudaya({...newBudaya, deskripsi: e.target.value})} rows={4}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 focus:bg-white outline-none transition-all resize-y"
              placeholder="Ceritakan sejarah atau makna kebudayaan ini..."
            />
          </div>
          
          <div className="pt-4 flex items-center gap-4">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-fuchsia-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <><span className="animate-spin text-xl">⌛</span> Menyimpan...</>
              ) : (
                <>Simpan Data Budaya 🚀</>
              )}
            </button>
            {message && (
              <span className={`text-sm font-semibold px-4 py-2 rounded-lg ${message.includes('✅') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* List Budaya */}
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <span>📋</span> Direktori Budaya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {budayaList.map((budaya) => (
            <div key={budaya.id} className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-fuchsia-200 transition-all bg-white flex flex-col">
              {budaya.foto_url ? (
                <div className="w-full h-48 bg-slate-100 relative overflow-hidden">
                  <img src={budaya.foto_url} alt={budaya.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="font-bold text-xl text-white line-clamp-1">{budaya.judul}</h3>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center text-5xl">
                  🎭
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                {!budaya.foto_url && (
                  <h3 className="font-bold text-xl text-slate-800 line-clamp-1 mb-2 group-hover:text-fuchsia-600 transition-colors">{budaya.judul}</h3>
                )}
                {budaya.foto_url && (
                  <h3 className="font-bold text-xl text-slate-800 line-clamp-1 mb-2 group-hover:text-fuchsia-600 transition-colors">{budaya.judul}</h3>
                )}
                
                <div className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {budaya.deskripsi || '-'}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => handleDelete(budaya.id)}
                    className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          {budayaList.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Belum ada data budaya.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
