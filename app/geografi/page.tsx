export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Header from '../components/Header';
import Footer from '../components/Footer';
import prisma from '@/lib/prisma';

export default async function GeografiPage() {
  const data = await prisma.geografi.findUnique({
    where: { id: 1 }
  });
  
  const letakLuas = data?.letak_dan_luas || 'Belum ada data letak dan luas wilayah.';
  const kondisiTanah = (data?.kondisi_tanah as any) || [];
  const kependudukan = (data?.kependudukan as any) || [];
  const mataPencaharian = (data?.mata_pencaharian as any) || [];
  const pendidikan = (data?.tingkat_pendidikan as any) || [];
  const sarana = (data?.sarana_prasarana as any) || {
    perhubungan: [], pendidikan: [], keagamaan: [], seni_budaya: [], prasarana_desa: []
  };

  return (
    <>
      <Header />
      <div className="pt-8 min-h-screen flex flex-col bg-slate-50">
        <section id="geografi" className="section flex-1">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#1e3a8a] mb-4 font-serif">Kondisi Umum Desa</h1>
              <div className="h-1 w-24 bg-[#f59e0b] mx-auto rounded"></div>
            </div>

            {/* Letak dan Luas Wilayah */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="text-3xl">📍</span> Letak dan Luas Wilayah
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg text-justify whitespace-pre-wrap">
                {letakLuas}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Kondisi Tanah */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🌱</span> Kondisi Tanah
                </h2>
                <div className="space-y-3">
                  {kondisiTanah.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
                  {kondisiTanah.length === 0 && <p className="text-slate-400 text-sm">Belum ada data</p>}
                </div>
              </div>

              {/* Kependudukan */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">👥</span> Kependudukan
                </h2>
                <div className="space-y-3">
                  {kependudukan.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
                  {kependudukan.length === 0 && <p className="text-slate-400 text-sm">Belum ada data</p>}
                </div>
              </div>
            </div>

            {/* Ekonomi & Pendidikan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">💼</span> Mata Pencaharian
                </h2>
                <div className="space-y-3">
                  {mataPencaharian.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
                  {mataPencaharian.length === 0 && <p className="text-slate-400 text-sm">Belum ada data</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🎓</span> Tingkat Pendidikan
                </h2>
                <div className="space-y-3">
                  {pendidikan.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
                  {pendidikan.length === 0 && <p className="text-slate-400 text-sm">Belum ada data</p>}
                </div>
              </div>
            </div>

            {/* Sarana dan Prasarana */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <span className="text-3xl">🏛️</span> Sarana dan Prasarana
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Perhubungan */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Perhubungan</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {(sarana.perhubungan || []).map((item: any, i: number) => (
                      <li key={i} className="flex justify-between"><span>{item.label}</span> <span className="font-semibold">{item.value}</span></li>
                    ))}
                  </ul>
                </div>

                {/* Pendidikan */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Pendidikan</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {(sarana.pendidikan || []).map((item: any, i: number) => (
                      <li key={i} className="flex justify-between"><span>{item.label}</span> <span className="font-semibold">{item.value}</span></li>
                    ))}
                  </ul>
                </div>

                {/* Keagamaan */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Keagamaan</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {(sarana.keagamaan || []).map((item: any, i: number) => (
                      <li key={i} className="flex justify-between"><span>{item.label}</span> <span className="font-semibold">{item.value}</span></li>
                    ))}
                  </ul>
                </div>

                {/* Seni Budaya */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Seni dan Budaya</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {(sarana.seni_budaya || []).map((item: any, i: number) => (
                      <li key={i} className="flex justify-between"><span>{item.label}</span> <span className="font-semibold">{item.value}</span></li>
                    ))}
                  </ul>
                </div>

                {/* Prasarana Desa */}
                <div className="bg-slate-50 p-6 rounded-xl lg:col-span-2">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Sarana Prasarana Desa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
                    {(sarana.prasarana_desa || []).map((item: any, i: number) => (
                      <div key={i} className="flex justify-between"><span>{item.label}</span> <span className="font-semibold">{item.value}</span></div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
