"use client";

import { useEffect, useState, useRef } from 'react';
import { dbAction } from '@/app/actions/admin';
import { Pencil, Trash2, Plus, Save, Image as ImageIcon } from 'lucide-react';

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
    sambutan_nama: '',
    sambutan_foto_url: ''
  });

  const [fotoHeroFile, setFotoHeroFile] = useState<File | null>(null);
  const [fotoPengumumanFile, setFotoPengumumanFile] = useState<File | null>(null);
  const [fotoSambutanFile, setFotoSambutanFile] = useState<File | null>(null);

  // Slider State
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [sliderJudul, setSliderJudul] = useState('');
  const [sliderDeskripsi, setSliderDeskripsi] = useState('');
  const [sliderFile, setSliderFile] = useState<File | null>(null);
  const sliderInputRef = useRef<HTMLInputElement>(null);

  // Pandangan Masyarakat State
  const [masyarakatList, setMasyarakatList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    nama: '',
    pekerjaan: '',
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
      const { data: beranda, error: err1 } = await dbAction('beranda', 'findUnique', { where: { id: 1 } });
      if (!err1 && beranda) {
        setBerandaData(beranda);
      }
      
      // Fetch Pandangan Masyarakat
      const { data: masyarakat, error: err2 } = await dbAction('pandanganMasyarakat', 'findMany', { orderBy: { urutan: 'asc' } });
      if (!err2 && masyarakat) {
        setMasyarakatList(masyarakat);
      }

      // Fetch Slider
      const { data: sliders, error: err3 } = await dbAction('sliderBeranda', 'findMany', { orderBy: { urutan: 'asc' } });
      if (!err3 && sliders) {
        setSliderList(sliders);
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

  const uploadFileLocal = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Gagal mengupload file');
    const { url } = await res.json();
    return url;
  };

  const handleBerandaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBeranda(true);
    setMessage('');
    
    try {
      let heroUrl = berandaData.foto_hero_url;
      let pengumumanUrl = berandaData.pengumuman_foto_url;
      let sambutanUrl = berandaData.sambutan_foto_url;

      if (fotoHeroFile) heroUrl = await uploadFileLocal(fotoHeroFile);
      if (fotoPengumumanFile) pengumumanUrl = await uploadFileLocal(fotoPengumumanFile);
      if (fotoSambutanFile) sambutanUrl = await uploadFileLocal(fotoSambutanFile);

      const updatedBeranda = {
        judul_hero: berandaData.judul_hero,
        pengumuman_judul: berandaData.pengumuman_judul,
        pengumuman_deskripsi: berandaData.pengumuman_deskripsi,
        sambutan_judul: berandaData.sambutan_judul,
        sambutan_isi: berandaData.sambutan_isi,
        sambutan_nama: berandaData.sambutan_nama,
        foto_hero_url: heroUrl,
        pengumuman_foto_url: pengumumanUrl,
        sambutan_foto_url: sambutanUrl,
      };

      const { error } = await dbAction('beranda', 'upsert', {
        where: { id: 1 },
        update: updatedBeranda,
        create: { id: 1, ...updatedBeranda }
      });
      if (error) throw new Error(error);
      
      setBerandaData(updatedBeranda);
      setFotoHeroFile(null);
      setFotoPengumumanFile(null);
      setFotoSambutanFile(null);
      setMessage('✅ Berhasil menyimpan Beranda!');
    } catch (error: any) {
      console.error('Error saving beranda:', error);
      setMessage(`❌ Gagal menyimpan data Beranda: ${error.message || JSON.stringify(error)}`);
    } finally {
      setSavingBeranda(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // --- SLIDER HANDLERS ---
  const handleAddSlider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sliderFile) return alert('Silakan pilih foto slider');
    setSavingBeranda(true);
    try {
      const url = await uploadFileLocal(sliderFile);
      const { data, error } = await dbAction('sliderBeranda', 'create', {
        data: {
          judul: sliderJudul,
          deskripsi: sliderDeskripsi,
          foto_url: url,
          urutan: sliderList.length
        }
      });
      if (error) throw new Error(error);
      setSliderList([...sliderList, data]);
      setSliderJudul('');
      setSliderDeskripsi('');
      setSliderFile(null);
      if (sliderInputRef.current) sliderInputRef.current.value = '';
    } catch (error) {
      console.error(error);
      alert('Gagal menambah slider');
    } finally {
      setSavingBeranda(false);
    }
  };

  const deleteSlider = async (id: string) => {
    if (!confirm('Hapus slide ini?')) return;
    try {
      const { error } = await dbAction('sliderBeranda', 'delete', { where: { id } });
      if (error) throw new Error(error);
      setSliderList(sliderList.filter(s => s.id !== id));
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus slider');
    }
  };

  // --- PANDANGAN MASYARAKAT HANDLERS ---
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      nama: item.nama,
      pekerjaan: item.pekerjaan || '',
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
      nama: '',
      pekerjaan: '',
      kutipan: '',
      urutan: masyarakatList.length + 1
    });
  };

  const saveMasyarakat = async () => {
    try {
      const parsedUrutan = parseInt(editForm.urutan.toString(), 10);
      const dataToSave = { ...editForm, urutan: isNaN(parsedUrutan) ? 0 : parsedUrutan };

      if (editingId === 0) {
        // Create
        const { error } = await dbAction('pandanganMasyarakat', 'create', {
          data: dataToSave
        });
        if (error) throw new Error(error);
      } else {
        // Update
        const { error } = await dbAction('pandanganMasyarakat', 'update', {
          where: { id: editingId },
          data: dataToSave
        });
        if (error) throw new Error(error);
      }
      setEditingId(null);
      fetchData(); // reload list
    } catch (error) {
      console.error('Error saving masyarakat:', error);
      alert('Gagal menyimpan data.');
    }
  };

  const deleteMasyarakat = async (id: string) => {
    if (!confirm('Hapus pandangan masyarakat ini?')) return;
    try {
      const { error } = await dbAction('pandanganMasyarakat', 'delete', {
        where: { id }
      });
      if (error) throw new Error(error);
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

            <div className="col-span-1 md:col-span-2 mt-4 hidden">
              <h3 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Pengumuman (Bawah Banner)</h3>
            </div>
            <div className="hidden">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Pengumuman</label>
              <input type="text" name="pengumuman_judul" value={berandaData.pengumuman_judul} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="hidden">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Pengumuman</label>
              <input type="text" name="pengumuman_deskripsi" value={berandaData.pengumuman_deskripsi} onChange={handleBerandaChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-2 hidden">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Pengumuman</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFotoPengumumanFile)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Sambutan / Kepala Desa</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFotoSambutanFile)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              {berandaData.sambutan_foto_url && !fotoSambutanFile && (
                <div className="mt-2">
                  <img src={berandaData.sambutan_foto_url} alt="Current Sambutan" className="w-24 h-24 rounded-full object-cover" />
                </div>
              )}
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

      {/* SECTION: SLIDER PENGUMUMAN */}
      <div className="max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Slider Pengumuman / Foto Beranda</h2>
            <p className="text-slate-500 text-sm">Tambahkan beberapa foto yang akan bergeser otomatis di halaman utama</p>
          </div>
        </div>

        <form onSubmit={handleAddSlider} className="mb-8 p-6 bg-blue-50/50 border border-blue-100 rounded-xl space-y-4">
          <h3 className="font-bold text-blue-800">Tambah Slide Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Judul / Teks Besar</label>
              <input type="text" value={sliderJudul} onChange={e => setSliderJudul(e.target.value)} className="w-full px-3 py-2 rounded-lg border outline-none bg-white" placeholder="Cth: Pengumuman Desa" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi / Teks Kecil</label>
              <input type="text" value={sliderDeskripsi} onChange={e => setSliderDeskripsi(e.target.value)} className="w-full px-3 py-2 rounded-lg border outline-none bg-white" placeholder="Cth: Hadiri acara..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Foto</label>
              <input ref={sliderInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files) setSliderFile(e.target.files[0]) }} className="w-full px-3 py-2 rounded-lg border outline-none bg-white" required />
            </div>
          </div>
          <button type="submit" disabled={savingBeranda} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Slide
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sliderList.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-[16/9]">
              <img src={item.foto_url} alt={item.judul} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <h4 className="text-white font-bold text-lg leading-tight mb-1">{item.judul || 'Tanpa Judul'}</h4>
                <p className="text-slate-300 text-xs line-clamp-2">{item.deskripsi}</p>
              </div>
              <button 
                onClick={() => deleteSlider(item.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {sliderList.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              Belum ada foto slider.
            </div>
          )}
        </div>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama</label>
                <input type="text" name="nama" value={editForm.nama} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan / Pekerjaan</label>
                <input type="text" name="pekerjaan" value={editForm.pekerjaan} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border outline-none" />
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
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 shrink-0 uppercase">
                {item.nama ? item.nama.substring(0, 2) : 'A'}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{item.nama} <span className="text-sm font-normal text-slate-500">({item.pekerjaan})</span></h4>
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
