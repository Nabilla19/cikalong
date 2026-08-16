"use client";

import { useEffect, useState, useRef } from 'react';
import { dbAction } from '@/app/actions/admin';
import { Trash2 } from 'lucide-react';

export default function ProdukHukumAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [produkList, setProdukList] = useState<any[]>([]);
  
  const [judul, setJudul] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await dbAction('produkHukum', 'findMany', { orderBy: { created_at: 'desc' } });
      if (error) throw new Error(error);
      if (data) setProdukList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus dokumen ini?')) return;
    try {
      const { error } = await dbAction('produkHukum', 'delete', { where: { id } });
      if (error) throw new Error(error);
      setProdukList(produkList.filter(p => p.id !== id));
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
    if (!selectedFile) {
      setMessage('❌ Harap pilih file dokumen PDF.');
      return;
    }

    setSaving(true);
    setMessage('');
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Gagal upload file');
      const { url } = await res.json();
      const fileUrl = url;

      const { data: dbData, error } = await dbAction('produkHukum', 'create', { data: { judul, file_url: fileUrl } });
      if (error) throw new Error(error);
      
      if (dbData) {
        setProdukList([dbData, ...produkList]);
        setJudul('');
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
      <div className="max-w-3xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30 text-white">
            ⚖️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Produk Hukum</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola dokumen produk hukum desa</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Dokumen</label>
            <input 
              type="text" required value={judul} onChange={e => setJudul(e.target.value)}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Contoh: Peraturan Desa No 1 Tahun 2026"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">File Dokumen (PDF disarankan)</label>
            <input 
              ref={fileInputRef} type="file" required accept=".pdf,.doc,.docx" onChange={handleFileChange}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          
          <div className="pt-4 flex items-center gap-4">
            <button 
              type="submit" disabled={saving}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50"
            >
              {saving ? 'Mengunggah...' : 'Tambahkan'}
            </button>
            {message && <span className="text-sm font-semibold text-slate-700">{message}</span>}
          </div>
        </form>
      </div>

      <div className="max-w-3xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Daftar Dokumen</h2>
        <div className="space-y-4">
          {produkList.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-slate-800">{item.judul}</h3>
                <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-600 hover:underline">Lihat File</a>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {produkList.length === 0 && <p className="text-center text-slate-500 py-4">Belum ada dokumen.</p>}
        </div>
      </div>
    </div>
  );
}
