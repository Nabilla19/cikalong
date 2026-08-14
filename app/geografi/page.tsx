import Header from '../components/Header';
import Footer from '../components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GeografiPage() {
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
              <p className="text-slate-600 leading-relaxed text-lg text-justify">
                Desa Cikalong merupakan salah satu desa dari tujuh desa yang berada di kecamatan Sidamulih Kabupaten Pangandaran Provinsi Jawa Barat. Desa Cikalong juga dilewati oleh jalur jalan Kecamatan, sepanjang 4,975 Km. Desa Cikalong memiliki perbukitan yang cukup indah, dengan udaranya yang sejuk berkisar 37°C dengan pesawahan yang luas. Mempunyai luas wilayah 948,778 Ha dengan titik koordinat -7.648910, 108.565858.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Kondisi Tanah */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🌱</span> Kondisi Tanah
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Sawah', value: '210 Ha' },
                    { label: 'Pekarangan', value: '219,700 Ha' },
                    { label: 'Pemukiman', value: '96,559 Ha' },
                    { label: 'Pemakaman', value: '2,800 Ha' },
                    { label: 'Tanah Desa', value: '90,200 Ha' },
                    { label: 'Tanah Negara (Perhutani)', value: '174,150 Ha' },
                    { label: 'Kebun Rakyat', value: '155,369 Ha' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kependudukan */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">👥</span> Kependudukan
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Jumlah Penduduk', value: '3.548 Jiwa' },
                    { label: 'Laki-laki', value: '1.705 Jiwa' },
                    { label: 'Perempuan', value: '1.843 Jiwa' },
                    { label: 'Kepala Keluarga (KK)', value: '1.492 KK' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
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
                  {[
                    { label: 'Petani', value: '1.323 Orang' },
                    { label: 'Buruh', value: '289 Orang' },
                    { label: 'Pedagang', value: '153 Orang' },
                    { label: 'Jasa / Sopir', value: '16 Orang' },
                    { label: 'PNS', value: '50 Orang' },
                    { label: 'TNI / POLRI', value: '5 Orang' },
                    { label: 'Lainnya', value: '1.812 Orang' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🎓</span> Tingkat Pendidikan
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Tidak / Belum Tamat SD', value: '495 Orang' },
                    { label: 'Tamat SD', value: '1.826 Orang' },
                    { label: 'Tamat SLTP', value: '512 Orang' },
                    { label: 'Tamat SLTA', value: '325 Orang' },
                    { label: 'Tamat Akademik', value: '33 Orang' },
                    { label: 'Sarjana S.1 / S.2', value: '79 Orang' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className="font-bold text-[#1e3a8a]">{item.value}</span>
                    </div>
                  ))}
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
                    <li className="flex justify-between"><span>Jalan Aspal</span> <span className="font-semibold">5,5 Km</span></li>
                    <li className="flex justify-between"><span>Jalan Beton</span> <span className="font-semibold">2,25 Km</span></li>
                    <li className="flex justify-between"><span>Jembatan Beton</span> <span className="font-semibold">6 Buah</span></li>
                  </ul>
                </div>

                {/* Pendidikan */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Pendidikan</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex justify-between"><span>SDN (Baik)</span> <span className="font-semibold">2 Lokasi</span></li>
                    <li className="flex justify-between"><span>TK (Baik)</span> <span className="font-semibold">2 Unit</span></li>
                    <li className="flex justify-between"><span>PAUD (Baik-Sedang)</span> <span className="font-semibold">1 Unit</span></li>
                  </ul>
                </div>

                {/* Keagamaan */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Keagamaan</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex justify-between"><span>Masjid Jami</span> <span className="font-semibold">10 Unit</span></li>
                    <li className="flex justify-between"><span>Mushola</span> <span className="font-semibold">12 Unit</span></li>
                    <li className="flex justify-between"><span>Diniyah</span> <span className="font-semibold">6 Lokasi</span></li>
                  </ul>
                </div>

                {/* Seni Budaya */}
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Seni dan Budaya</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex justify-between"><span>Seni Ibing Sunda</span> <span className="font-semibold">6 Grup</span></li>
                    <li className="flex justify-between"><span>Kosidah</span> <span className="font-semibold">10 Grup</span></li>
                    <li className="flex justify-between"><span>Orkes Melayu</span> <span className="font-semibold">3 Grup</span></li>
                    <li className="flex justify-between"><span>Kuda Lumping</span> <span className="font-semibold">2 Grup</span></li>
                    <li className="flex justify-between"><span>Tembang Beluk</span> <span className="font-semibold">1 Grup</span></li>
                    <li className="flex justify-between"><span>Gondang Buhun</span> <span className="font-semibold">38 Grup</span></li>
                  </ul>
                </div>

                {/* Prasarana Desa */}
                <div className="bg-slate-50 p-6 rounded-xl lg:col-span-2">
                  <h3 className="font-bold text-[#1e3a8a] mb-4">Sarana Prasarana Desa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
                    <div className="flex justify-between"><span>Balai Desa (Baik)</span> <span className="font-semibold">1 Unit</span></div>
                    <div className="flex justify-between"><span>POSKESDES (Baik-Sedang)</span> <span className="font-semibold">1 Unit</span></div>
                    <div className="flex justify-between"><span>POSYANDU (Baik)</span> <span className="font-semibold">6 Unit</span></div>
                    <div className="flex justify-between"><span>Jalan Kecamatan (Baik)</span> <span className="font-semibold">1 Lokasi</span></div>
                    <div className="flex justify-between"><span>Jalan Desa (Baik)</span> <span className="font-semibold">3 Lokasi</span></div>
                    <div className="flex justify-between"><span>Jalan Dusun (Baik)</span> <span className="font-semibold">9 Lokasi</span></div>
                    <div className="flex justify-between"><span>Jembatan Beton (Baik)</span> <span className="font-semibold">4 Lokasi</span></div>
                    <div className="flex justify-between"><span>Jembatan Cor (Baik)</span> <span className="font-semibold">3 Unit</span></div>
                    <div className="flex justify-between"><span>Irigasi (Baik)</span> <span className="font-semibold">2 Unit</span></div>
                    <div className="flex justify-between"><span>Lapang Olah Raga (Baik)</span> <span className="font-semibold">2 Lokasi</span></div>
                    <div className="flex justify-between"><span>Lapang Volly (Baik)</span> <span className="font-semibold">7 Lokasi</span></div>
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
