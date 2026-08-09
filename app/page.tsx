import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 0;

export default async function Home() {
  const [
    { data: profil },
    { data: struktur },
    { data: geografi },
    { data: umkm },
    { data: berita },
    { data: pengaturan }
  ] = await Promise.all([
    supabase.from('profil_desa').select('*').eq('id', 1).single(),
    supabase.from('struktur_organisasi').select('*').order('urutan', { ascending: true }),
    supabase.from('geografi').select('*').eq('id', 1).single(),
    supabase.from('umkm').select('*').order('nama_usaha', { ascending: true }),
    supabase.from('berita').select('*').order('diterbitkan_pada', { ascending: false }),
    supabase.from('pengaturan_web').select('*').eq('id', 1).single()
  ]);

  const misiArray = profil?.misi ? profil.misi.split('\n').filter(Boolean) : [
    'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.',
    'Membangun infrastruktur desa yang memadai dan berwawasan lingkungan.',
    'Melestarikan budaya dan kearifan lokal Desa Cikalong.',
    'Memberdayakan ekonomi kerakyatan melalui UMKM dan pariwisata.'
  ];

  const kades = struktur?.find((s: any) => s.urutan === 1);
  const sekdes = struktur?.find((s: any) => s.urutan === 2);
  const kaur = struktur?.filter((s: any) => s.urutan === 3) || [];
  const kasi = struktur?.filter((s: any) => s.urutan === 4) || [];
  const kadus = struktur?.filter((s: any) => s.urutan === 5) || [];


  const masyarakat = [
    { inisial: 'AS', nama: 'Bapak Aman Suherman', jabatan: 'Tokoh Adat', kutipan: 'Cikalong Budayanya Masih Terjaga.' },
    { inisial: 'HN', nama: 'Ibu Hasna', jabatan: 'UMKM Cikalong', kutipan: 'Cikalong Makanannya Enak-enak.' },
    { inisial: 'OD', nama: 'Bapak Odin', jabatan: 'Petani', kutipan: 'Cikalong Masih Asri dan Bersih.' },
    { inisial: 'NN', nama: 'Ibu Nunung', jabatan: 'Tokoh Seni', kutipan: 'Cikalong Bagian dari Budaya Seni di Jawa Barat.' },
    { inisial: 'DC', nama: 'Dwi C', jabatan: 'Masyarakat', kutipan: 'Cikalong merupakan rumah yang tiada bosannya.' },
    { inisial: 'DA', nama: 'Dilla A', jabatan: 'Masyarakat', kutipan: 'Cikalong adalah desa yang hijau membuat mata segar.' },
  ];

  const budaya = [
    { title: 'Tradisi Babarit', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-21%20at%2020.40.47_ac536313.jpg?updatedAt=1751085089270', desc: 'Merupakan salah satu kebiasaan masyarakat Desa Cikalong yang dilaksanakan sebagai bentuk ungkapan rasa syukur kepada Tuhan Yang Maha Esa dan alam atas segala kenikmatan yang telah diberikan.' },
    { title: 'Nampaling', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/DSC00157%20(1).jpg?updatedAt=1751085090268', desc: 'Adalah tradisi turun-temurun masyarakat Desa Cikalong, Pangandaran, berupa kegiatan menangkap belalang (simeut) di sawah menggunakan alat tradisional bernama Tampaling.' },
    { title: 'Tradisi Hajat Bumi dan Ngabuku Taun', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-16%20at%206.20.42%20PM%20(1).jpeg?updatedAt=1750776307542', desc: 'Dilaksanakan setiap tahun sebagai wujud syukur atas hasil panen dan keseimbangan manusia-alam-spiritual, sekaligus mempererat silaturahmi melalui gotong royong.' },
    { title: 'Hari Jadi Desa', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-20%20at%206.47.29%20PM.jpeg?updatedAt=1750776309049', desc: 'Biasanya diperingati setiap tanggal 15 September, bertepatan dengan masa panen para petani.' },
    { title: 'Tradisi Nyusur Tanah', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-21%20at%2020.41.51_cd544896.jpg?updatedAt=1751085089236', desc: 'Adalah upacara adat pasca-pemakaman yang melibatkan tokoh adat, tokoh agama, keluarga, dan masyarakat.' },
    { title: 'Degung', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/DSC09970.jpg?updatedAt=1751085443116', desc: 'Merupakan salah satu kesenian tradisional yang masih dijaga oleh masyarakat Desa Cikalong. Dimainkan menggunakan seperangkat alat musik gamelan.' },
    { title: 'Eok Beluk', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/DSC00009.jpg?updatedAt=1751085090022', desc: 'Adalah kesenian vokal tradisional khas Sunda yang dulunya berfungsi sebagai media komunikasi sesama warga Sunda.' },
    { title: 'Seni Ngampihan Pare (Rengkong)', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/IMG_0124.JPG?updatedAt=1750777782290', desc: 'Merupakan tradisi arak-arakan mengangkut padi dari sawah ke lumbung secara bersama-sama oleh warga menggunakan sebatang bambu panjang.' },
    { title: 'Ronggeng Gunung', img: 'https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-21%20at%2020.43.18_7a500dc8.jpg?updatedAt=1751085089435', desc: 'Adalah tarian tradisional khas Jawa Barat yang sarat makna, mulai dari legenda kepahlawanan hingga kisah cinta dan balas dendam.' },
  ];

  return (
    <>
      <Header />
      
      {/* BERANDA - BANNER UTAMA */}
      <section id="beranda" className="section pt-32 bg-light">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Selamat Datang di Website Digital Desa Cikalong</h1>
          </div>
          
          <div className="main-image-wrapper">
            <img 
              src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-22%20at%2015.39.30_5c32b844.jpg?updatedAt=1750776307281" 
              alt="Balai Desa Cikalong" 
              className="main-banner-img"
            />
          </div>

          <div className="carousel-container mt-12">
            <div className="carousel-slide">
              <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/IMG_7633.HEIC?updatedAt=1751085829472" alt="Pengumuman" />
              <div className="carousel-content">
                <h3 className="carousel-title">Pengumuman Penting Desa</h3>
                <p className="carousel-description">Informasi penting dari Kantor Desa untuk Masyarakat Desa Cikalong.</p>
              </div>
            </div>
          </div>

          <div className="card mt-12 mb-12 flex flex-col items-center text-center">
            <h3 className="card-title text-[#1e3a8a] mb-6">Sambutan Kepala Desa</h3>
            <div className="sambutan-text text-gray-700 leading-relaxed max-w-3xl w-full px-4">
              <p className="mb-4">Assalamu’alaikum Warahmatullahi Wabarakatuh,<br/>Salam sejahtera,</p>
              <p className="mb-4">Selamat datang di website resmi Desa Cikalong.</p>
              <p className="mb-4">Website ini kami hadirkan sebagai sarana informasi, komunikasi, dan transparansi pelayanan publik kepada masyarakat.</p>
              <p className="mb-4">Dengan semangat <strong>"Ngahiji Ku Rasa, Ngahaja Ku Karsa, Ngajayakeun Cikalong"</strong>, mari kita bersama membangun desa yang maju, mandiri, dan berbudaya.</p>
              <p className="mb-4">Terima kasih atas kunjungan Anda. Saran dan masukan sangat kami harapkan demi kemajuan bersama.</p>
              <p className="mb-6">Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
              <p className="text-xl font-bold text-gray-900 mt-2 pb-4">Ruspandi</p>
            </div>
          </div>

          <h2 className="section-subtitle mt-16 text-[#1e3a8a]">Pandangan Umum Masyarakat</h2>
          <div className="grid-staff mt-8">
            {masyarakat.map((item, idx) => (
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

      {/* PROFIL DESA */}
      <section id="profil" className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Profil Desa Cikalong</h1>
          </div>
          
          <div className="card">
            <h3 className="card-title">Sejarah Desa</h3>
            <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-wrap">
              {profil?.sejarah || 'Sejarah belum ditambahkan.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="card h-full">
              <h3 className="card-title text-center text-[#1e3a8a]">Visi Desa</h3>
              <p className="text-gray-700 text-center font-medium leading-relaxed italic text-lg">"{profil?.visi || 'Visi belum ditambahkan.'}"</p>
            </div>

            <div className="card h-full">
              <h3 className="card-title">Misi Desa</h3>
              <ul className="list-decimal pl-6 text-gray-600 space-y-3 leading-relaxed">
                {misiArray.map((m: string, i: number) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STRUKTUR */}
      <section id="struktur" className="section bg-light">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Struktur Perangkat Desa</h1>
          </div>
          <div className="org-chart-container mt-12 pb-8">
            <div className="min-w-full md:min-w-[1000px] flex flex-col items-center overflow-x-hidden md:overflow-x-visible">
              
              {/* Level 1: Kepala Desa */}
              <div className="org-node relative z-10 w-full flex flex-col items-center">
                <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-6 py-4 rounded shadow-md text-center w-72 relative">
                  <h3 className="font-serif text-sm mb-1">{kades?.jabatan || 'Kepala Desa'}</h3>
                  <p className="font-black text-xl uppercase tracking-wide">{kades?.nama || 'Belum diisi'}</p>
                </div>
                <div className="w-[3px] h-8 bg-[#22c55e]"></div> {/* Garis Utama Hijau */}
              </div>

              {/* Level 2: Sekretaris Desa */}
              <div className="w-full max-w-4xl mx-auto relative z-10 md:h-24 flex flex-col md:flex-row justify-center md:justify-end items-center mt-6 md:mt-0">
                {/* Horizontal Red Line from Center to Sekdes center (Desktop Only) */}
                <div className="hidden md:block absolute top-0 left-1/2 right-[128px] h-[3px] bg-red-500 -z-10"></div>
                
                {/* Center Green Trunk continuing through Sekdes row */}
                <div className="hidden md:block absolute top-0 left-1/2 -ml-[1.5px] w-[3px] h-full bg-[#22c55e] -z-10"></div>

                <div className="w-64 flex flex-col items-center">
                  <div className="w-[3px] h-6 bg-[#22c55e] md:bg-red-500 relative z-0"></div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-6 py-3 rounded shadow-md text-center w-full relative z-10">
                    <h3 className="font-serif text-sm mb-1">{sekdes?.jabatan || 'Sekretaris Desa'}</h3>
                    <p className="font-black text-lg uppercase">{sekdes?.nama || 'Belum diisi'}</p>
                  </div>
                </div>
              </div>
              
              {/* Garis Horizontal Kaur (Hijau) - Desktop Only */}
              <div className="hidden md:block w-full max-w-4xl h-[3px] bg-[#22c55e] mx-auto"></div>

              {/* Level 3: Kaur Row */}
              <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl relative z-10 mt-0 gap-4 md:gap-0">
                {kaur.length > 0 ? kaur.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="flex flex-col items-center w-64">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                      <h3 className="font-serif text-xs mb-1">{item.jabatan}</h3>
                      <p className="font-bold text-sm uppercase">{item.nama}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-400 py-4 w-full text-center hidden md:block">Data Kaur belum diisi (urutan 3 di admin)</p>
                )}
              </div>

              {/* Trunk going down to Kasi (Green & Red) - Desktop Only */}
              <div className="hidden md:flex mx-auto mt-6 -mb-1 z-0">
                <div className="w-[3px] h-12 bg-[#22c55e]"></div>
                <div className="w-[3px] h-12 bg-red-500 ml-1"></div>
              </div>
              
              {/* Garis Kasi (Hijau & Merah) - Desktop Only */}
              <div className="hidden md:flex w-full max-w-4xl mx-auto flex-col">
                <div className="w-full h-[3px] bg-[#22c55e] mb-1"></div>
                <div className="w-full h-[3px] bg-red-500"></div>
              </div>

              {/* Level 4: Kasi Row */}
              <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl relative z-10 mt-0 gap-4 md:gap-0">
                {kasi.length > 0 ? kasi.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="flex flex-col items-center w-64">
                    <div className="flex">
                      <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                      <div className="w-[3px] h-6 bg-red-500 ml-1 md:block hidden"></div>
                    </div>
                    <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                      <h3 className="font-serif text-xs mb-1">{item.jabatan}</h3>
                      <p className="font-bold text-sm uppercase">{item.nama}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-400 py-4 w-full text-center hidden md:block">Data Kasi belum diisi (urutan 4 di admin)</p>
                )}
              </div>

              {/* Garis Bawah ke Kadus (Hijau & Merah) - Desktop Only */}
              <div className="hidden md:flex mx-auto mt-6 -mb-1 z-0">
                <div className="w-[3px] h-12 bg-[#22c55e]"></div>
                <div className="w-[3px] h-12 bg-red-500 ml-1"></div>
              </div>
              
              <div className="hidden md:flex w-full max-w-4xl mx-auto flex-col">
                <div className="w-full h-[3px] bg-[#22c55e] mb-1"></div>
                <div className="w-full h-[3px] bg-red-500"></div>
              </div>

              {/* Level 5: Kadus Row */}
              <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl relative z-10 mt-0 gap-4 md:gap-0">
                {kadus.length > 0 ? kadus.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="flex flex-col items-center w-64">
                    <div className="flex">
                      <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                      <div className="w-[3px] h-6 bg-red-500 ml-1 md:block hidden"></div>
                    </div>
                    <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                      <h3 className="font-serif text-xs mb-1">{item.jabatan}</h3>
                      <p className="font-bold text-sm uppercase">{item.nama}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-400 py-4 w-full text-center hidden md:block">Data Kadus belum diisi (urutan 5 di admin)</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* GEOGRAFI */}
      <section id="geografi" className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Geografi Desa Cikalong</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card h-full">
              <h3 className="card-title">Lokasi dan Wilayah</h3>
              <img 
                src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-20%20at%2016.51.22_09ceb57c.jpg?updatedAt=1750776306995" 
                alt="Geografi Cikalong"
                className="rounded-2xl shadow-md my-6 w-full object-cover h-64"
              />
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{geografi?.deskripsi || 'Belum ada data geografi.'}</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="card flex-1">
                <h3 className="card-title">Batas Wilayah</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Utara:</strong> {geografi?.batas_utara || 'Desa Kersaratu'}</li>
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Selatan:</strong> {geografi?.batas_selatan || 'Desa Sukaresik'}</li>
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Timur:</strong> {geografi?.batas_timur || 'Desa Sidamulih'}</li>
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Barat:</strong> {geografi?.batas_barat || 'Desa Bojong'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* AKTIVITAS & BUDAYA */}
      <section id="aktivitas" className="section bg-light">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Aktivitas & Budaya Desa Cikalong</h1>
          </div>
          <h2 className="section-subtitle mt-8 mb-8 text-[#1e3a8a]">Pelestarian Budaya Leluhur</h2>
          
          <div className="grid-budaya">
            {budaya.map((b, i) => (
              <div key={i} className="card p-0 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 group">
                <div className="relative overflow-hidden h-56">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl z-10">{b.title}</h3>
                </div>
                <div className="p-6 flex-1 bg-white">
                  <p className="text-gray-600 leading-relaxed text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA */}
      <section id="berita" className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Berita Desa</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {berita?.map((item: any) => (
              <div key={item.id} className="card hover:-translate-y-2 transition-transform duration-300">
                {item.foto_url && (
                  <img src={item.foto_url} alt={item.judul} className="w-full h-48 object-cover rounded-xl mb-4" />
                )}
                <h3 className="card-title text-xl">
                  {item.judul}
                </h3>
                <p className="text-xs font-semibold text-[#1e3a8a] mb-3 tracking-wider uppercase">{new Date(item.diterbitkan_pada).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                <p className="text-gray-600 leading-relaxed">{item.isi}</p>
              </div>
            ))}
            {(!berita || berita.length === 0) && (
              <p className="col-span-full text-center text-gray-500 py-8">Belum ada berita yang diterbitkan.</p>
            )}
          </div>
        </div>
      </section>

      {/* UMKM */}
      <section id="umkm" className="section bg-light">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">UMKM Desa Cikalong</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {umkm?.map((item: any) => (
              <div key={item.id} className="card flex flex-col hover:-translate-y-2 transition-transform duration-300">
                {item.foto_url && (
                  <div className="h-48 mb-6 overflow-hidden rounded-xl">
                    <img src={item.foto_url} alt={item.nama_usaha} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">{item.nama_usaha}</h3>
                <div className="space-y-2 text-sm text-gray-600 flex-1">
                  <p><strong className="text-gray-900">Produk:</strong> {item.produk}</p>
                  <p><strong className="text-gray-900">Pemilik:</strong> {item.pemilik}</p>
                  <p><strong className="text-gray-900">Alamat:</strong> {item.alamat}</p>
                  <p className="mt-4 italic">{item.deskripsi}</p>
                </div>
              </div>
            ))}
            {(!umkm || umkm.length === 0) && (
              <p className="col-span-full text-center text-gray-500 py-8">Belum ada data Budaya/UMKM.</p>
            )}
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title text-center">Hubungi Kami</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
            <div className="card md:col-span-3">
              <h3 className="card-title text-2xl mb-6">Informasi Kontak</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📞</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">WhatsApp Pelayanan</strong>
                    <span className="text-gray-600">{pengaturan?.nomor_wa || '+62 853-2013-9810 (Endi)'}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">✉️</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">Email Desa</strong>
                    <span className="text-gray-600 break-all">{pengaturan?.email || 'cikalongpangandaran@gmail.com'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📱</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">Media Sosial</strong>
                    <span className="text-gray-600 block text-sm">{pengaturan?.instagram || 'IG: @desacikalongpnd'}</span>
                    <span className="text-gray-600 block text-sm">{pengaturan?.facebook || 'TikTok: @desacikalongpnd'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📍</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">Alamat Kantor</strong>
                    <span className="text-gray-600 text-sm block mb-2">Jl. Cikalong - Sidamulih No. 45<br/>Kec. Sidamulih, Pangandaran</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card md:col-span-2">
              <h3 className="card-title border-b border-[#1e3a8a]/20 pb-4 mb-6 text-2xl">Jam Pelayanan</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Senin - Jumat</span>
                  <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm font-semibold">08.00 - 14.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Sabtu</span>
                  <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm font-semibold">08.00 - 12.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Minggu</span>
                  <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold line-through">Tutup</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
