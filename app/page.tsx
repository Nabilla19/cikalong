import Header from './components/Header';
import Footer from './components/Footer';
import ZoomableImage from './components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [
    { data: beranda },
    { data: masyarakat }
  ] = await Promise.all([
    supabase.from('beranda').select('*').eq('id', 1).single(),
    supabase.from('pandangan_masyarakat').select('*').order('urutan', { ascending: true })
  ]);

  const fallbackMasyarakat = [
    { inisial: 'AS', nama: 'Bapak Aman Suherman', jabatan: 'Tokoh Adat', kutipan: 'Cikalong Budayanya Masih Terjaga.' },
    { inisial: 'HN', nama: 'Ibu Hasna', jabatan: 'UMKM Cikalong', kutipan: 'Cikalong Makanannya Enak-enak.' },
    { inisial: 'OD', nama: 'Bapak Odin', jabatan: 'Petani', kutipan: 'Cikalong Masih Asri dan Bersih.' },
    { inisial: 'NN', nama: 'Ibu Nunung', jabatan: 'Tokoh Seni', kutipan: 'Cikalong Bagian dari Budaya Seni di Jawa Barat.' },
    { inisial: 'DC', nama: 'Dwi C', jabatan: 'Masyarakat', kutipan: 'Cikalong merupakan rumah yang tiada bosannya.' },
    { inisial: 'DA', nama: 'Dilla A', jabatan: 'Masyarakat', kutipan: 'Cikalong adalah desa yang hijau membuat mata segar.' },
  ];

  const pandangan = (masyarakat && masyarakat.length > 0) ? masyarakat : fallbackMasyarakat;

  return (
    <>
      <Header />

      {/* BERANDA - BANNER UTAMA */}
      <section id="beranda" className="section pt-32 bg-light min-h-screen">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">
              {beranda?.judul_hero || 'Selamat Datang di Website Digital Desa Cikalong'}
            </h1>
          </div>

          <div className="main-image-wrapper">
            <ZoomableImage
              src={beranda?.foto_hero_url || "https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-22%20at%2015.39.30_5c32b844.jpg?updatedAt=1750776307281"}
              alt="Balai Desa Cikalong"
              className="main-banner-img"
            />
          </div>

          <div className="carousel-container mt-12">
            <div className="carousel-slide">
              <ZoomableImage 
                src={beranda?.pengumuman_foto_url || "https://ik.imagekit.io/klccxl9cu/Web%20Desa/IMG_7633.HEIC?updatedAt=1751085829472"} 
                alt="Pengumuman" 
              />
              <div className="carousel-content">
                <h3 className="carousel-title">{beranda?.pengumuman_judul || 'Pengumuman Penting Desa'}</h3>
                <p className="carousel-description">{beranda?.pengumuman_deskripsi || 'Informasi penting dari Kantor Desa untuk Masyarakat Desa Cikalong.'}</p>
              </div>
            </div>
          </div>

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
              
              <Link href="/profil" className="mt-8 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-full inline-flex items-center gap-2 transition-all hover:-translate-y-1 shadow-lg shadow-emerald-700/30">
                Baca Profil Lengkap <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <h2 className="section-subtitle mt-16 text-[#1e3a8a]">Pandangan Umum Masyarakat</h2>
          <div className="grid-staff mt-8">
            {pandangan.map((item: any, idx: number) => (
              <div key={idx} className="staff-card">
                <div className="staff-photo">{item.inisial}</div>
                <h3 className="text-xl font-bold text-gray-900">{item.nama}</h3>
                <p className="text-[#1e3a8a] font-semibold mb-4">{item.jabatan}</p>
                <p className="text-gray-600 italic">"{item.kutipan}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
