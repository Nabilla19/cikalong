"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function GeografiPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    deskripsi: '',
    batas_utara: '',
    batas_selatan: '',
    batas_barat: '',
    batas_timur: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('geografi').select('*').eq('id', 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setFormData({
          deskripsi: data.deskripsi || '',
          batas_utara: data.batas_utara || '',
          batas_selatan: data.batas_selatan || '',
          batas_barat: data.batas_barat || '',
          batas_timur: data.batas_timur || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const { error } = await supabase.from('geografi').upsert({ id: 1, ...formData });
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

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Memuat data geografi...</div>;

  return (
    <div className="max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
          🗺️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Geografi & Letak Desa</h1>
          <p className="text-slate-500 text-sm">Kelola informasi wilayah dan batas desa</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Geografis & Topografi</label>
          <textarea 
            name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows={5}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all resize-y"
            placeholder="Ketikkan kondisi geografis desa di sini..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Batas Utara</label>
            <input 
              type="text" name="batas_utara" value={formData.batas_utara} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              placeholder="Berbatasan dengan..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Batas Selatan</label>
            <input 
              type="text" name="batas_selatan" value={formData.batas_selatan} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              placeholder="Berbatasan dengan..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Batas Barat</label>
            <input 
              type="text" name="batas_barat" value={formData.batas_barat} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              placeholder="Berbatasan dengan..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Batas Timur</label>
            <input 
              type="text" name="batas_timur" value={formData.batas_timur} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              placeholder="Berbatasan dengan..."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <><span className="animate-spin">⌛</span> Menyimpan...</>
            ) : (
              <><span className="text-xl">💾</span> Simpan Perubahan</>
            )}
          </button>
          {message && (
            <span className={`text-sm font-medium px-4 py-2 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
