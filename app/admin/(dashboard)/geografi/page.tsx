"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';

type KeyValue = { label: string; value: string };

type SaranaPrasarana = {
  perhubungan: KeyValue[];
  pendidikan: KeyValue[];
  keagamaan: KeyValue[];
  seni_budaya: KeyValue[];
  prasarana_desa: KeyValue[];
};

const defaultSarana: SaranaPrasarana = {
  perhubungan: [],
  pendidikan: [],
  keagamaan: [],
  seni_budaya: [],
  prasarana_desa: []
};

export default function GeografiPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [letakLuas, setLetakLuas] = useState('');
  const [kondisiTanah, setKondisiTanah] = useState<KeyValue[]>([]);
  const [kependudukan, setKependudukan] = useState<KeyValue[]>([]);
  const [mataPencaharian, setMataPencaharian] = useState<KeyValue[]>([]);
  const [pendidikan, setPendidikan] = useState<KeyValue[]>([]);
  const [sarana, setSarana] = useState<SaranaPrasarana>(defaultSarana);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('geografi').select('*').eq('id', 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setLetakLuas(data.letak_dan_luas || '');
        setKondisiTanah(data.kondisi_tanah || []);
        setKependudukan(data.kependudukan || []);
        setMataPencaharian(data.mata_pencaharian || []);
        setPendidikan(data.tingkat_pendidikan || []);
        setSarana(data.sarana_prasarana || defaultSarana);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleListChange = (
    setter: React.Dispatch<React.SetStateAction<KeyValue[]>>, 
    index: number, 
    field: 'label' | 'value', 
    newValue: string
  ) => {
    setter(prev => {
      const copy = [...prev];
      copy[index][field] = newValue;
      return copy;
    });
  };

  const addListItem = (setter: React.Dispatch<React.SetStateAction<KeyValue[]>>) => {
    setter(prev => [...prev, { label: '', value: '' }]);
  };

  const removeListItem = (setter: React.Dispatch<React.SetStateAction<KeyValue[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaranaChange = (category: keyof SaranaPrasarana, index: number, field: 'label' | 'value', newValue: string) => {
    setSarana(prev => {
      const copy = { ...prev };
      if (!copy[category]) copy[category] = [];
      copy[category][index][field] = newValue;
      return copy;
    });
  };

  const addSaranaItem = (category: keyof SaranaPrasarana) => {
    setSarana(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), { label: '', value: '' }]
    }));
  };

  const removeSaranaItem = (category: keyof SaranaPrasarana, index: number) => {
    setSarana(prev => ({
      ...prev,
      [category]: (prev[category] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const payload = {
        id: 1,
        letak_dan_luas: letakLuas,
        kondisi_tanah: kondisiTanah,
        kependudukan: kependudukan,
        mata_pencaharian: mataPencaharian,
        tingkat_pendidikan: pendidikan,
        sarana_prasarana: sarana
      };
      const { error } = await supabase.from('geografi').upsert(payload);
      if (error) throw error;
      setMessage('✅ Berhasil disimpan!');
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('❌ Gagal menyimpan data.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const renderListEditor = (title: string, data: KeyValue[], setter: React.Dispatch<React.SetStateAction<KeyValue[]>>) => (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <button type="button" onClick={() => addListItem(setter)} className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-emerald-200 transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input 
              type="text" value={item.label} onChange={(e) => handleListChange(setter, i, 'label', e.target.value)}
              placeholder="Contoh: Petani" className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input 
              type="text" value={item.value} onChange={(e) => handleListChange(setter, i, 'value', e.target.value)}
              placeholder="1.323 Orang" className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="button" onClick={() => removeListItem(setter, i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {data.length === 0 && <p className="text-sm text-slate-400 text-center py-2">Belum ada data.</p>}
      </div>
    </div>
  );

  const renderSaranaEditor = (title: string, category: keyof SaranaPrasarana) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <button type="button" onClick={() => addSaranaItem(category)} className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-emerald-200 transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>
      <div className="space-y-3">
        {(sarana[category] || []).map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input 
              type="text" value={item.label} onChange={(e) => handleSaranaChange(category, i, 'label', e.target.value)}
              placeholder="Fasilitas..." className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input 
              type="text" value={item.value} onChange={(e) => handleSaranaChange(category, i, 'value', e.target.value)}
              placeholder="Jumlah..." className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="button" onClick={() => removeSaranaItem(category, i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {(!sarana[category] || sarana[category].length === 0) && <p className="text-sm text-slate-400 text-center py-2">Belum ada data.</p>}
      </div>
    </div>
  );

  if (loading) return <div className="p-8 flex items-center justify-center text-emerald-600"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">🗺️</div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Geografi & Letak Desa</h1>
            <p className="text-slate-500 text-sm">Kelola informasi statistik dan wilayah desa secara lengkap</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {/* Letak Luas */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">📍 Letak dan Luas Wilayah</h2>
          <textarea 
            value={letakLuas} onChange={e => setLetakLuas(e.target.value)} rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-y"
            placeholder="Deskripsi wilayah..."
          />
        </div>

        {/* 2 Kolom: Tanah & Penduduk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">🌱 Kondisi Tanah</h2>
            {renderListEditor('Data Tanah', kondisiTanah, setKondisiTanah)}
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">👥 Kependudukan</h2>
            {renderListEditor('Data Kependudukan', kependudukan, setKependudukan)}
          </div>
        </div>

        {/* 2 Kolom: Ekonomi & Pendidikan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">💼 Mata Pencaharian</h2>
            {renderListEditor('Data Profesi', mataPencaharian, setMataPencaharian)}
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">🎓 Tingkat Pendidikan</h2>
            {renderListEditor('Data Pendidikan', pendidikan, setPendidikan)}
          </div>
        </div>

        {/* Sarana Prasarana */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">🏛️ Sarana dan Prasarana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderSaranaEditor('Perhubungan', 'perhubungan')}
            {renderSaranaEditor('Pendidikan', 'pendidikan')}
            {renderSaranaEditor('Keagamaan', 'keagamaan')}
            {renderSaranaEditor('Seni dan Budaya', 'seni_budaya')}
            <div className="md:col-span-2 lg:col-span-2">
              {renderSaranaEditor('Sarana Prasarana Desa', 'prasarana_desa')}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:left-72 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-40 flex justify-end">
          <div className="flex items-center gap-4 max-w-6xl w-full mx-auto justify-end">
            {message && (
              <span className={`text-sm font-medium px-4 py-2 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </span>
            )}
            <button 
              type="submit" disabled={saving}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
