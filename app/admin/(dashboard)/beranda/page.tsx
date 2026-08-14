"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Pencil, Trash2, Plus, Save } from 'lucide-react';

export default function BerandaAdminPage() {
  const [loading, setLoading] = useState(true);
  const [savingBeranda, setSavingBeranda] = useState(false);
  const [message, setMessage] = useState('');
  
  // Beranda State
  const [berandaData, setBerandaData] = useState({
    judul_hero: '',
    foto_hero_url: '',
    pengumuman_judul: '',
    pengumuman_deskripsi: '',
    pengumuman_foto_url: '',
    sambutan_judul: '',
    sambutan_isi: '',
    sambutan_nama: ''
  });

  const [fotoHeroFile, setFotoHeroFile] = useState<File | null>(null);
  const [fotoPengumumanFile, setFotoPengumumanFile] = useState<File | null>(null);

  // Pandangan Masyarakat State
  const [masyarakatList, setMasyarakatList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    inisial: '',
    nama: '',
    jabatan: '',
    kutipan: '',
    urutan: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      // Fetch Beranda
      const { data: beranda, error: err1 } = await supabase.from('beranda').select('*').eq('id', 1).single();
      if (!err1 && beranda) {
        setBerandaData(beranda);
      }
      
      // Fetch Pandangan Masyarakat
      const { data: masyarakat, error: err2 } = await supabase.from('pandangan_masyarakat').select('*').order('urutan', { ascending: true });
      if (!err2 && masyarakat) {
        setMasyarakatList(masyarakat);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  // --- BERANDA HANDLERS ---
  const handleBerandaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBerandaData({ ...berandaData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleBerandaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBeranda(true);
    setMessage('');
    
    try {
      let heroUrl = berandaData.foto_hero_url;
      let pengumumanUrl = berandaData.pengumuman_foto_url;

      // Upload Foto Hero
      if (fotoHeroFile) {
        const fileExt = fotoHeroFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `beranda/hero_${fileName}`;
        
        const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, fotoHeroFile);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
        heroUrl = data.publicUrl;
      }

      // Upload Foto Pengumuman
      if (fotoPengumumanFile) {
        const fileExt = fotoPengumumanFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `beranda/pengumuman_${fileName}`;
        
        const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, fotoPengumumanFile);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
        pengumumanUrl = data.publicUrl;
      }

      const updatedBeranda = {
        ...berandaData,
        foto_hero_url: heroUrl,
        pengumuman_foto_url: pengumumanUrl,
      };

      const { error } = await supabase.from('beranda').upsert({ id: 1, ...updatedBeranda });
      if (error) throw error;
      
      setBerandaData(updatedBeranda);
      setFotoHeroFile(null);
      setFotoPengumumanFile(null);
      setMessage('✅ Berhasil menyimpan Beranda!');
    } catch (error: any) {
      console.error('Error saving beranda:', error);
      setMessage(`❌ Gagal menyimpan data Beranda: ${error.message || JSON.stringify(error)}`);
    } finally {
      setSavingBeranda(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // --- PANDANGAN MASYARAKAT HANDLERS ---
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      inisial: item.inisial,
      nama: item.nama,
      jabatan: item.jabatan,
      kutipan: item.kutipan,
      urutan: item.urutan
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const startAdd = () => {
    setEditingId(0); // 0 means new item
    setEditForm({
      inisial: '',
      nama: '',
      jabatan: '',
      kutipan: '',
      urutan: masyarakatList.length + 1
    });
  };

  const saveMasyarakat = async () => {
    try {
      if (editingId === 0) {
        // Create
        const { error } = await supabase.from('pandangan_masyarakat').insert([editForm]);
        if (error) throw error;
      } else {
        // Update
        const { error } = await supabase.from('pandangan_masyarakat').update(editForm).eq('id', editingId);
        if (error) throw error;
      }
      setEditingId(null);
      fetchData(); // reload list
    } catch (error) {
      console.error('Error saving masyarakat:', error);
      alert('Gagal menyimpan data.');
    }
  };

  const deleteMasyarakat = async (id: number) => {
    if (!confirm('Hapus pandangan masyarakat ini?')) return;
    try {
      const { error } = await supabase.from('pandangan_masyarakat').delete().eq('id', id);
      if (error) throw error;
      fetchData(); // reload
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data.');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Memuat data beranda...</div>;

  return (
    <div className="space-y-8">
      {/* SECTION: BERANDA CONTENT */}
      <div className="max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            🏠
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Konten Beranda</h1>
            <p className="text-slate-500 text-sm">Kelola banner, pengumuman, dan sambutan di halaman utama</p>
          </div>
        </div>
        
        <form onSubmit={handleBerandaSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Hero Banner</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Hero</label>
              <input type="text" name="judul_hero" value={berandaData.judul_hero} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Hero</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFotoHeroFile)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              {berandaData.foto_hero_url && !fotoHeroFile && (
                <div className="mt-2">
                  <img src={berandaData.foto_hero_url} alt="Current Hero" className="w-32 h-auto rounded-lg object-cover" />
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Pengumuman (Bawah Banner)</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Pengumuman</label>
              <input type="text" name="pengumuman_judul" value={berandaData.pengumuman_judul} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Pengumuman</label>
              <input type="text" name="pengumuman_deskripsi" value={berandaData.pengumuman_deskripsi} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Pengumuman</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFotoPengumumanFile)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              {berandaData.pengumuman_foto_url && !fotoPengumumanFile && (
                <div className="mt-2">
                  <img src={berandaData.pengumuman_foto_url} alt="Current Pengumuman" className="w-32 h-auto rounded-lg object-cover" />
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Sambutan Kepala Desa</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Sambutan</label>
              <input type="text" name="sambutan_judul" value={berandaData.sambutan_judul} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama (cth: Ruspandi)</label>
              <input type="text" name="sambutan_nama" value={berandaData.sambutan_nama} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Sambutan</label>
              <textarea name="sambutan_isi" value={berandaData.sambutan_isi} onChange={handleBerandaChange} rows={6} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none whitespace-pre-wrap"></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
            <button type="submit" disabled={savingBeranda} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2">
              {savingBeranda ? 'Menyimpan...' : 'Simpan Beranda'}
            </button>
            {message && <span className="text-sm font-medium px-4 py-2 bg-green-100 text-green-700 rounded-lg">{message}</span>}
          </div>
        </form>
      </div>

      {/* SECTION: PANDANGAN MASYARAKAT */}
      <div className="max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Pandangan Masyarakat</h2>
            <p className="text-slate-500 text-sm">Kelola testimoni atau pandangan warga desa</p>
          </div>
          <button onClick={startAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
            <Plus className="w-4 h-4" /> Tambah
          </button>
        </div>

        {editingId !== null && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <h3 className="font-bold text-blue-800 mb-4">{editingId === 0 ? 'Tambah Baru' : 'Edit Data'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inisial (2 Huruf)</label>
                <input type="text" name="inisial" value={editForm.inisial} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border outline-none" maxLength={2} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama</label>
                <input type="text" name="nama" value={editForm.nama} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan / Status</label>
                <input type="text" name="jabatan" value={editForm.jabatan} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Urutan (Angka)</label>
                <input type="number" name="urutan" value={editForm.urutan} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border outline-none" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kutipan / Testimoni</label>
                <textarea name="kutipan" value={editForm.kutipan} onChange={handleEditChange} rows={3} className="w-full px-3 py-2 rounded-lg border outline-none"></textarea>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={saveMasyarakat} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4"/> Simpan</button>
              <button onClick={cancelEdit} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold">Batal</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {masyarakatList.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 shrink-0">
                {item.inisial}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{item.nama} <span className="text-sm font-normal text-slate-500">({item.jabatan})</span></h4>
                <p className="text-sm text-slate-600 italic">"{item.kutipan}"</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(item)} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => deleteMasyarakat(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {masyarakatList.length === 0 && <p className="text-center text-slate-500">Belum ada data.</p>}
        </div>
      </div>
    </div>
  );
}
