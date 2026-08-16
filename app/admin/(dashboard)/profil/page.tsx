"use client";

import { useEffect, useState } from 'react';
import { dbAction } from '@/app/actions/admin';

export default function ProfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    sejarah: '',
    visi: '',
    misi: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await dbAction('profilDesa', 'findUnique', { where: { id: 1 } });
      if (data) {
        setFormData({
          sejarah: data.sejarah || '',
          visi: data.visi || '',
          misi: data.misi || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const { error } = await dbAction('profilDesa', 'upsert', {
        where: { id: 1 },
        update: formData,
        create: { id: 1, ...formData }
      });
      if (error) throw new Error(error);
      setMessage('✅ Berhasil disimpan!');
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('❌ Gagal menyimpan data.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Memuat data profil...</div>;

  return (
    <div className="max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
          📖
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sejarah & Visi Misi</h1>
          <p className="text-slate-500 text-sm">Kelola narasi profil Desa Cikalong</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Sejarah Desa</label>
          <textarea 
            name="sejarah" value={formData.sejarah} onChange={handleChange} rows={6}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y"
            placeholder="Ketikkan sejarah desa di sini..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Visi Desa</label>
          <textarea 
            name="visi" value={formData.visi} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y"
            placeholder="Contoh: Terwujudnya Desa yang Maju..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Misi Desa (Pisahkan dengan baris baru)</label>
          <textarea 
            name="misi" value={formData.misi} onChange={handleChange} rows={5}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y"
            placeholder="1. Meningkatkan pelayanan...&#10;2. Membangun infrastruktur..."
          />
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
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
