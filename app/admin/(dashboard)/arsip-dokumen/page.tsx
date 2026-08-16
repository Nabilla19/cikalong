"use client";

import { useEffect, useState, useRef } from 'react';
import { dbAction } from '@/app/actions/admin';
import { Trash2 } from 'lucide-react';

export default function ArsipDokumenAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [arsipList, setArsipList] = useState<any[]>([]);
  
  const [judul, setJudul] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await dbAction('arsipDokumen', 'findMany', { orderBy: { created_at: 'desc' } });
      if (error) throw new Error(error);
      if (data) setArsipList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus dokumen ini?')) return;
    try {
      const { error } = await dbAction('arsipDokumen', 'delete', { where: { id } });
      if (error) throw new Error(error);
      setArsipList(arsipList.filter(p => p.id !== id));
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
      setMessage('❌ Harap pilih file dokumen.');
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

      const { data: dbData, error } = await dbAction('arsipDokumen', 'create', { data: { judul, file_url: fileUrl } });
      if (error) throw new Error(error);
      
      if (dbData) {
        setArsipList([dbData, ...arsipList]);
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
          <div className="w-14 h-14 bg-gradient-to-br from-stone-400 to-neutral-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-stone-500/30 text-white">
            🗃️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Arsip Dokumen</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola arsip dokumen dan transparansi publik</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Dokumen / Deskripsi</label>
            <input 
              type="text" required value={judul} onChange={e => setJudul(e.target.value)}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-stone-500 outline-none"
              placeholder="Contoh: Laporan APBDes atau Gotong Royong"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">File Dokumen / Foto</label>
            <input 
              ref={fileInputRef} type="file" required accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-stone-500 outline-none"
            />
          </div>
          
          <div className="pt-4 flex items-center gap-4">
            <button 
              type="submit" disabled={saving}
              className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50"
            >
              {saving ? 'Mengunggah...' : 'Tambahkan'}
            </button>
            {message && <span className="text-sm font-semibold text-slate-700">{message}</span>}
          </div>
        </form>
      </div>

      <div className="max-w-3xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Daftar Arsip & Dokumentasi</h2>
        <div className="space-y-4">
          {arsipList.map((item) => {
            const isImage = item.file_url?.toLowerCase().match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/) !== null;
            return (
            <div key={item.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                {isImage ? (
                  <img src={item.file_url} alt="arsip" className="w-16 h-16 object-cover rounded-lg shrink-0" />
                ) : (
                  <div className="w-16 h-16 bg-stone-100 text-stone-500 rounded-lg flex items-center justify-center text-2xl shrink-0">📄</div>
                )}
                <div>
                  <h3 className="font-bold text-slate-800 line-clamp-2">{item.judul}</h3>
                  {!isImage && <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Buka File</a>}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            );
          })}
          {arsipList.length === 0 && <p className="text-center text-slate-500 py-4">Belum ada dokumen.</p>}
        </div>
      </div>
    </div>
  );
}
