"use client";

import { useEffect, useState, useRef } from 'react';
import { dbAction } from '@/app/actions/admin';

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

  // State untuk Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ judul: '', isi: '' });
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const editFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await dbAction('berita', 'findMany', { orderBy: { diterbitkan_pada: 'desc' } });
      if (error) throw new Error(error);
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
      const { error } = await dbAction('berita', 'delete', { where: { id } });
      if (error) throw new Error(error);
      setBeritaList(beritaList.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus berita.');
    }
  };

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
        const formData = new FormData();
        formData.append('file', selectedFile);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Gagal upload file');
        const { url } = await res.json();
        fotoUrl = url;
      }

      const { data: dbData, error } = await dbAction('berita', 'create', { data: { ...newBerita, foto_url: fotoUrl } });
      if (error) throw new Error(error);

      if (dbData) {
        setBeritaList([dbData, ...beritaList]);
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
  };

  const startEdit = (berita: Berita) => {
    setEditingId(berita.id);
    setEditData({ judul: berita.judul, isi: berita.isi });
    setEditFile(null);
    setEditMessage('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ judul: '', isi: '' });
    setEditFile(null);
    setEditMessage('');
  };

  const handleEditSave = async (berita: Berita) => {
    setEditSaving(true);
    setEditMessage('');
    try {
      let fotoUrl = berita.foto_url;
      if (editFile) {
        const formData = new FormData();
        formData.append('file', editFile);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Gagal upload foto baru');
        const { url } = await res.json();
        fotoUrl = url;
      }

      const { data: updated, error } = await dbAction('berita', 'update', {
        where: { id: berita.id },
        data: { judul: editData.judul, isi: editData.isi, foto_url: fotoUrl },
      });

      if (error) throw new Error(error);

      if (updated) {
        setBeritaList(beritaList.map(b => b.id === berita.id ? updated : b));
        setEditMessage('✅ Berhasil disimpan!');
        setTimeout(() => {
          cancelEdit();
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error updating:', error);
      setEditMessage(`❌ ${error.message || 'Gagal menyimpan'}`);
    } finally {
      setEditSaving(false);
    }
  };

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
              type="text" required value={newBerita.judul} onChange={e => setNewBerita({ ...newBerita, judul: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white outline-none transition-all"
              placeholder="Contoh: Kerja Bakti Massal Desa Cikalong..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Berita</label>
            <p className="text-xs text-slate-400 mb-2">💡 Tip: untuk link yang bisa diklik, tulis lengkap dengan https:// contoh: https://docs.google.com/...</p>
            <textarea
              required value={newBerita.isi} onChange={e => setNewBerita({ ...newBerita, isi: e.target.value })} rows={8}
              className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white outline-none transition-all resize-y"
              placeholder="Tulis selengkapnya di sini... &#10;&#10;Untuk link download, tulis: Klik di sini: https://docs.google.com/..."
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
        <div className="flex flex-col gap-6">
          {beritaList.map((berita) => (
            <div key={berita.id} className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden">
              {editingId === berita.id ? (
                /* === FORM EDIT INLINE === */
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-slate-700 text-base mb-2 flex items-center gap-2">
                    <span>✏️</span> Edit Berita
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Judul</label>
                    <input
                      type="text"
                      value={editData.judul}
                      onChange={e => setEditData({ ...editData, judul: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Isi Berita</label>
                    <textarea
                      value={editData.isi}
                      onChange={e => setEditData({ ...editData, isi: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 text-sm resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Ganti Foto (Opsional)</label>
                    <label className="flex items-center gap-3 cursor-pointer border border-dashed border-slate-300 rounded-xl p-3 hover:border-orange-400 transition-all bg-slate-50">
                      <span className="text-xl">📷</span>
                      <span className="text-xs text-slate-500">{editFile ? editFile.name : 'Klik untuk pilih foto baru (kosongkan jika tidak diganti)'}</span>
                      <input
                        ref={editFileRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={e => setEditFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    {berita.foto_url && !editFile && (
                      <p className="text-xs text-slate-400 mt-1">Foto saat ini: <span className="text-slate-600">{berita.foto_url.split('/').pop()}</span></p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleEditSave(berita)}
                      disabled={editSaving}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {editSaving ? <><span className="animate-spin">⌛</span> Menyimpan...</> : '💾 Simpan Perubahan'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={editSaving}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-sm transition-all"
                    >
                      Batal
                    </button>
                    {editMessage && (
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${editMessage.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {editMessage}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* === TAMPILAN CARD NORMAL === */
                <div className="flex flex-col sm:flex-row gap-0">
                  {/* Foto */}
                  {berita.foto_url ? (
                    <div className="sm:w-40 sm:flex-shrink-0 h-40 sm:h-auto bg-slate-100 overflow-hidden">
                      <img src={berita.foto_url} alt={berita.judul} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="sm:w-40 sm:flex-shrink-0 h-32 sm:h-auto bg-slate-50 border-r border-slate-100 flex items-center justify-center text-4xl">
                      🖼️
                    </div>
                  )}

                  {/* Konten */}
                  <div className="flex-1 p-5 flex flex-col min-w-0">
                    <h3 className="font-bold text-base text-slate-800 mb-1 line-clamp-2 leading-snug">{berita.judul}</h3>
                    <p className="text-xs font-medium text-orange-500 mb-2">
                      {new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                    </p>
                    <p className="text-sm text-slate-500 line-clamp-3 whitespace-pre-wrap break-words mb-4">{berita.isi}</p>
                    {/* Tombol Aksi */}
                    <div className="mt-auto flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => startEdit(berita)}
                        className="text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-500 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(berita.id)}
                        className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {beritaList.length === 0 && (
            <div className="py-12 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              Belum ada berita yang diterbitkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
