import Header from './components/Header';
import Footer from './components/Footer';
import ZoomableImage from './components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';

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

          <div className="card mt-12 mb-12 flex flex-col items-center text-center">
            <h3 className="card-title text-[#1e3a8a] mb-6">{beranda?.sambutan_judul || 'Sambutan Kepala Desa'}</h3>
            <div className="sambutan-text text-gray-700 leading-relaxed max-w-3xl w-full px-4 whitespace-pre-wrap">
              {beranda?.sambutan_isi ? beranda.sambutan_isi : (
                <>
                  <p className="mb-4">Assalamu’alaikum Warahmatullahi Wabarakatuh,<br />Salam sejahtera,</p>
                  <p className="mb-4">Selamat datang di website resmi Desa Cikalong.</p>
                  <p className="mb-4">Website ini kami hadirkan sebagai sarana informasi, komunikasi, dan transparansi pelayanan publik kepada masyarakat.</p>
                  <p className="mb-4">Dengan semangat <strong>"Ngahiji Ku Rasa, Ngahaja Ku Karsa, Ngajayakeun Cikalong"</strong>, mari kita bersama membangun desa yang maju, mandiri, dan berbudaya.</p>
                  <p className="mb-4">Terima kasih atas kunjungan Anda. Saran dan masukan sangat kami harapkan demi kemajuan bersama.</p>
                  <p className="mb-6">Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
                </>
              )}
              <p className="text-xl font-bold text-gray-900 mt-2 pb-4">{beranda?.sambutan_nama || 'Ruspandi'}</p>
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
