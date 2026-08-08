"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PengaturanPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    wa: '',
    email: '',
    alamat_kantor: '',
    ig: '',
    tiktok: '',
    teks_footer: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pengaturan_web')
        .select('*')
        .eq('id', 1)
        .single();
        
      if (error) throw error;
      if (data) {
        setFormData({
          wa: data.wa || '',
          email: data.email || '',
          alamat_kantor: data.alamat_kantor || '',
          ig: data.ig || '',
          tiktok: data.tiktok || '',
          teks_footer: data.teks_footer || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const { error } = await supabase
        .from('pengaturan_web')
        .update(formData)
        .eq('id', 1);
        
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

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">⚙️ Pengaturan & Kontak</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Pelayanan</label>
          <input 
            type="text" name="wa" value={formData.wa} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Desa</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Kantor</label>
          <textarea 
            name="alamat_kantor" value={formData.alamat_kantor} onChange={handleChange} rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (Username)</label>
          <input 
            type="text" name="ig" value={formData.ig} onChange={handleChange} placeholder="Contoh: @desacikalongpnd"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">TikTok (Username)</label>
          <input 
            type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} placeholder="Contoh: @desacikalongpnd"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">Teks Footer KKN (PPM)</label>
          <input 
            type="text" name="teks_footer" value={formData.teks_footer} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          {message && <span className="text-sm font-medium">{message}</span>}
        </div>
      </form>
    </div>
  );
}
