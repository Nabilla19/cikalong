import Header from './components/Header';
import Footer from './components/Footer';
import ZoomableImage from './components/ZoomableImage';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Slider from './components/Slider';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [
    beranda,
    masyarakat,
    sliders
  ] = await Promise.all([
    prisma.beranda.findUnique({ where: { id: 1 } }),
    prisma.pandanganMasyarakat.findMany({ orderBy: { urutan: 'asc' } }),
    prisma.sliderBeranda.findMany({ orderBy: { urutan: 'asc' } })
  ]);

  const pandangan = masyarakat || [];

  return (
    <>
      <Header />

      {/* BERANDA - BANNER UTAMA */}
      <section id="beranda" className="section pt-32 bg-light min-h-screen">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">
              {beranda?.judul_hero || "Website Resmi Desa Cikalong"}
            </h1>

            <p className="text-center mt-4 text-lg text-gray-600">
              Kecamatan Sidamulih, Kabupaten Pangandaran, Jawa Barat
            </p>
          </div>

          <div className="main-image-wrapper">
            <ZoomableImage
              src={beranda?.foto_hero_url || "https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-22%20at%2015.39.30_5c32b844.jpg?updatedAt=1750776307281"}
              alt="Balai Desa Cikalong"
              className="main-banner-img"
            />
          </div>

          {sliders && sliders.length > 0 && (
            <Slider slides={sliders} />
          )}

          <div className="mt-20 mb-12 bg-emerald-50 rounded-[3rem] p-8 md:p-12 shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto">
            <div className="w-full md:w-auto flex justify-center shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-[12px] border-white shadow-xl bg-white flex items-center justify-center">
                {beranda?.sambutan_foto_url ? (
                  <img src={beranda.sambutan_foto_url} alt={beranda?.sambutan_nama || 'Kepala Desa'} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl text-slate-300">👤</div>
                )}
              </div>
            </div>
            <div className="w-full md:flex-1 flex flex-col items-start text-left">
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 font-serif">
                Sambutan <span className="text-emerald-700">Kepala Desa</span>
              </h3>
              <p className="text-xl font-bold text-slate-900 mb-6">{beranda?.sambutan_nama || 'Kepala Desa'}</p>

              <div className="flex gap-4">
                <span className="text-emerald-300 text-6xl font-serif leading-none mt-[-10px]">&ldquo;</span>
                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {beranda?.sambutan_isi ? beranda.sambutan_isi : 'Selamat datang di situs resmi Desa Cikalong. Melalui situs ini kami berupaya menghadirkan pelayanan yang mudah, informasi yang terbuka, dan ruang bagi warga untuk ikut membangun desa Cikalong.'}
                </div>
              </div>
            </div>
          </div>

          {pandangan.length > 0 && (
            <>
              <h2 className="section-subtitle mt-16 text-[#1e3a8a]">Pandangan Umum Masyarakat</h2>
              <div className="grid-staff mt-8">
                {pandangan.map((item: any, idx: number) => (
                  <div key={idx} className="staff-card">
                    <div className="staff-photo uppercase">{item.nama ? item.nama.substring(0, 2) : 'A'}</div>
                    <h3 className="text-xl font-bold text-gray-900">{item.nama}</h3>
                    <p className="text-[#1e3a8a] font-semibold mb-4">{item.pekerjaan}</p>
                    <p className="text-gray-600 italic">"{item.kutipan}"</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
