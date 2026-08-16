"use client";

import { useEffect, useState } from 'react';
import { dbAction } from '@/app/actions/admin';

type Anggota = {
  id: string;
  jabatan: string;
  nama: string;
  urutan: number;
};

export default function StrukturPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([]);
  
  const [newAnggota, setNewAnggota] = useState({ jabatan: '', nama: '', urutan: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await dbAction('strukturOrganisasi', 'findMany', { orderBy: { urutan: 'asc' } });
      if (error) throw new Error(error);
      if (data) setAnggotaList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus anggota ini?')) return;
    try {
      const { error } = await dbAction('strukturOrganisasi', 'delete', { where: { id } });
      if (error) throw new Error(error);
      setAnggotaList(anggotaList.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data.');
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await dbAction('strukturOrganisasi', 'create', { data: newAnggota });
      if (error) throw new Error(error);
      if (data) {
        setAnggotaList([...anggotaList, data].sort((a, b) => a.urutan - b.urutan));
        setNewAnggota({ jabatan: '', nama: '', urutan: 0 });
        setMessage('✅ Berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Error adding:', error);
      setMessage('❌ Gagal menambahkan.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Memuat data struktur...</div>;

  return (
    <div className="space-y-8">
      {/* List Anggota */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            👥
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Struktur Organisasi</h1>
            <p className="text-slate-500 text-sm">Kelola daftar perangkat desa</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold">Urutan</th>
                <th className="py-3 px-4 font-semibold">Jabatan</th>
                <th className="py-3 px-4 font-semibold">Nama Pejabat</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {anggotaList.map((anggota) => (
                <tr key={anggota.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">{anggota.urutan}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{anggota.jabatan}</td>
                  <td className="py-3 px-4 text-slate-600">{anggota.nama}</td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(anggota.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {anggotaList.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">Belum ada data perangkat desa.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Tambah */}
      <div className="max-w-2xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">➕ Tambah Pejabat Baru</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan</label>
              <input 
                type="text" required value={newAnggota.jabatan} onChange={e => setNewAnggota({...newAnggota, jabatan: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Cth: Kepala Seksi"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Pejabat</label>
              <input 
                type="text" required value={newAnggota.nama} onChange={e => setNewAnggota({...newAnggota, nama: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Cth: Budi Santoso"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tingkat Urutan (Makin kecil makin atas posisinya)</label>
            <input 
              type="number" required value={newAnggota.urutan} onChange={e => setNewAnggota({...newAnggota, urutan: parseInt(e.target.value)})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none max-w-[150px]"
            />
          </div>
          
          <div className="pt-2 flex items-center gap-4">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Menambahkan...' : 'Tambah ke Struktur'}
            </button>
            {message && <span className="text-sm font-medium text-green-600">{message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
