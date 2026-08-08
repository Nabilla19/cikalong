import Link from 'next/link';

export default function Home() {
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
      {/* BERANDA */}
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

          <div className="card mt-12 mb-12">
            <h3 className="card-title text-center text-[#1e3a8a]">Sambutan Kepala Desa</h3>
            <div className="sambutan-text text-gray-700 leading-relaxed text-center max-w-4xl mx-auto px-4 md:px-8">
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
            <p className="text-gray-600 leading-relaxed mb-4">
              Desa Cikalong yang terletak di Kecamatan Sidamulih, Kabupaten Pangandaran, memiliki sejarah panjang yang sarat nilai budaya dan kearifan lokal. Berdiri sejak abad ke-18, desa ini awalnya merupakan wilayah adat yang dipimpin oleh para sesepuh seperti Eyang Raksa Dipa (Ki Gede Mataram) dan kemudian dilanjutkan oleh Eyang Pradjawidjaya Diningrat, seorang tokoh pelarian dari pasukan Pangeran Diponegoro. Nama “Cikalong” sendiri memiliki dua makna filosofis, yakni sebagai tempat awal berdirinya pemerintahan ("Cikal" berarti awal, "Long" dari elong berarti pemekaran), serta merujuk pada sumber air bawah tanah yang mengalir ke Sungai Cijumbleng.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Secara resmi dan administratif, Desa Cikalong berdiri pada Juli 1978 sebagai hasil pemekaran dari Desa Sukaresik. Hingga saat ini, Desa Cikalong masih melestarikan kearifan lokal, nilai-nilai spiritual, serta sistem gotong royong sebagai bentuk rasa syukur dan penghormatan terhadap alam serta leluhur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="card h-full">
              <h3 className="card-title text-center text-[#1e3a8a]">Visi Desa</h3>
              <p className="text-gray-700 text-center font-medium leading-relaxed italic text-lg">"Pembangunan Yang Berkelanjutan untuk Mewujudkan Desa Budaya dengan Menitikberatkan PADA PENDIDIKAN AGAMA DAN KARAKTER."</p>
            </div>

            <div className="card h-full">
              <h3 className="card-title">Misi Desa</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-3 leading-relaxed">
                <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.</li>
                <li>Membangun infrastruktur desa yang memadai dan berwawasan lingkungan.</li>
                <li>Melestarikan budaya dan kearifan lokal Desa Cikalong.</li>
                <li>Memberdayakan ekonomi kerakyatan melalui UMKM dan pariwisata.</li>
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
          <div className="org-chart-container mt-12 overflow-x-auto pb-8">
            <div className="min-w-[1000px] flex flex-col items-center">
              
              {/* Level 1: Kepala Desa */}
              <div className="org-node relative z-10 w-full flex flex-col items-center">
                <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-6 py-4 rounded shadow-md text-center w-72 relative">
                  <h3 className="font-serif text-sm mb-1">Kepala Desa Cikalong</h3>
                  <p className="font-black text-xl uppercase tracking-wide">Ruspandi</p>
                </div>
                <div className="w-1 h-12 bg-[#22c55e]"></div> {/* Garis Utama Hijau */}
              </div>

              {/* Level 2: Sekretaris Desa */}
              <div className="w-full relative z-10 -mt-6">
                <div className="absolute top-6 left-1/2 w-[25%] h-1 bg-red-500"></div>
                <div className="flex justify-end pr-[20%]">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-6 bg-red-500"></div>
                    <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-6 py-3 rounded shadow-md text-center w-64">
                      <h3 className="font-serif text-sm mb-1">Sekretaris Desa</h3>
                      <p className="font-black text-lg uppercase">Kosmara</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trunk going down to Kaur (Green only) */}
              <div className="w-1 h-12 bg-[#22c55e] mx-auto -mt-6"></div>
              
              {/* Garis Horizontal Kaur (Hijau) */}
              <div className="w-full max-w-4xl h-1 bg-[#22c55e] mx-auto"></div>

              {/* Level 3: Kaur Row */}
              <div className="flex justify-between w-full max-w-4xl relative z-10 mt-0">
                
                {/* Perencanaan */}
                <div className="flex flex-col items-center w-64">
                  <div className="w-1 h-6 bg-[#22c55e]"></div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kaur Perencanaan</h3>
                    <p className="font-bold text-sm uppercase">Etikah, A.Md</p>
                  </div>
                </div>

                {/* Keuangan + Staf */}
                <div className="flex flex-col items-center w-64">
                  <div className="w-1 h-6 bg-[#22c55e]"></div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kaur Keuangan</h3>
                    <p className="font-bold text-sm uppercase">Nolis Pitriani</p>
                  </div>
                  <div className="w-1 h-8 bg-[#22c55e]"></div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Staf Keuangan</h3>
                    <p className="font-bold text-sm uppercase">Arif Firmansyah</p>
                  </div>
                </div>

                {/* TU & Umum + Staf */}
                <div className="flex flex-col items-center w-64">
                  <div className="w-1 h-6 bg-[#22c55e]"></div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kaur Tata Usaha & Umum</h3>
                    <p className="font-bold text-sm uppercase">Sutarma Wiguna, S.Pd</p>
                  </div>
                  <div className="w-1 h-8 bg-[#22c55e]"></div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Staf Umum</h3>
                    <p className="font-bold text-sm uppercase">Endi Mulyadi, S.Pd</p>
                  </div>
                </div>

              </div>

              {/* Trunk going down to Kasi (Green & Red) */}
              <div className="flex mx-auto mt-6 -mb-1 z-0">
                <div className="w-[3px] h-12 bg-[#22c55e]"></div>
                <div className="w-[3px] h-12 bg-red-500 ml-1"></div>
              </div>
              
              {/* Garis Kasi (Hijau & Merah) */}
              <div className="w-full max-w-4xl mx-auto flex flex-col">
                <div className="w-full h-[3px] bg-[#22c55e] mb-1"></div>
                <div className="w-full h-[3px] bg-red-500"></div>
              </div>

              {/* Level 4: Kasi Row */}
              <div className="flex justify-between w-full max-w-4xl relative z-10 mt-0">
                
                <div className="flex flex-col items-center w-64">
                  <div className="flex">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="w-[3px] h-6 bg-red-500 ml-1"></div>
                  </div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kepala Seksi Pelayanan</h3>
                    <p className="font-bold text-sm uppercase">Sukirman</p>
                  </div>
                </div>

                <div className="flex flex-col items-center w-64">
                  <div className="flex">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="w-[3px] h-6 bg-red-500 ml-1"></div>
                  </div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kepala Seksi Pemerintahan</h3>
                    <p className="font-bold text-sm uppercase">Nurdiana, S. Pd.Si</p>
                  </div>
                </div>

                <div className="flex flex-col items-center w-64">
                  <div className="flex">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="w-[3px] h-6 bg-red-500 ml-1"></div>
                  </div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kepala Seksi Kesejahteraan</h3>
                    <p className="font-bold text-sm uppercase">Kusnendar</p>
                  </div>
                </div>

              </div>

              {/* Garis Bawah ke Kadus (Hijau & Merah) */}
              <div className="flex mx-auto mt-6 -mb-1 z-0">
                <div className="w-[3px] h-12 bg-[#22c55e]"></div>
                <div className="w-[3px] h-12 bg-red-500 ml-1"></div>
              </div>
              
              <div className="w-full max-w-4xl mx-auto flex flex-col">
                <div className="w-full h-[3px] bg-[#22c55e] mb-1"></div>
                <div className="w-full h-[3px] bg-red-500"></div>
              </div>

              {/* Level 5: Kadus Row */}
              <div className="flex justify-between w-full max-w-4xl relative z-10 mt-0">
                
                <div className="flex flex-col items-center w-64">
                  <div className="flex">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="w-[3px] h-6 bg-red-500 ml-1"></div>
                  </div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kepala Dusun Citembong</h3>
                    <p className="font-bold text-sm uppercase">Aris Kustandar</p>
                  </div>
                </div>

                <div className="flex flex-col items-center w-64">
                  <div className="flex">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="w-[3px] h-6 bg-red-500 ml-1"></div>
                  </div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kepala Dusun Cimanggu</h3>
                    <p className="font-bold text-sm uppercase">Didin Haridin</p>
                  </div>
                </div>

                <div className="flex flex-col items-center w-64">
                  <div className="flex">
                    <div className="w-[3px] h-6 bg-[#22c55e]"></div>
                    <div className="w-[3px] h-6 bg-red-500 ml-1"></div>
                  </div>
                  <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                    <h3 className="font-serif text-xs mb-1">Kepala Dusun Cimanggu</h3>
                    <p className="font-bold text-sm uppercase">Heri</p>
                  </div>
                </div>

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
              <p className="text-gray-600 leading-relaxed">Desa Cikalong terletak di Kecamatan Sidamulih, Kabupaten Pangandaran, Jawa Barat. Berdiri pada Juli 1978 sebagai hasil pemekaran dari Desa Sukaresik, desa ini dikenal dengan potensi alam dan budaya lokal yang kuat.</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="card flex-1">
                <h3 className="card-title">Batas Wilayah</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Utara:</strong> Desa Kersaratu</li>
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Selatan:</strong> Desa Sukaresik</li>
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Timur:</strong> Desa Sidamulih</li>
                  <li className="flex items-center gap-3"><span className="text-[#1e3a8a] font-bold text-xl">•</span> <strong>Barat:</strong> Desa Bojong</li>
                </ul>
              </div>

              <div className="card flex-1">
                <h3 className="card-title">Kondisi Geografis</h3>
                <p className="text-gray-600 leading-relaxed">Secara geografis, Desa Cikalong memiliki karakteristik alam yang khas, berupa wilayah perbukitan yang berhawa sejuk dengan suhu rata-rata sekitar 37°C. Hamparan sawah seluas hampir 949 hektar (tepatnya 948,778 Ha) menjadi bagian penting dari lanskap desa, sekaligus penopang sektor pertaniannya.</p>
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
            <div className="card hover:-translate-y-2 transition-transform duration-300">
              <h3 className="card-title text-xl">
                <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:text-[#1e3a8a] transition-colors">    
                    Desa Cikalong: Wisata Budaya yang Masih Melestarikan Tradisi Leluhur
                </Link>
              </h3>
              <p className="text-xs font-semibold text-[#1e3a8a] mb-3 tracking-wider uppercase">18 Juni 2025 • Kumparan.com</p>
              <p className="text-gray-600 leading-relaxed">Artikel ini menggambarkan keunikan lokal desa, mulai dari aktivitas seni budaya, sejarah yang hidup dalam keseharian warga, hingga nilai-nilai kearifan lokal yang terus dijaga.</p>
            </div>

            <div className="card hover:-translate-y-2 transition-transform duration-300">
              <h3 className="card-title text-xl">
                <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:text-[#1e3a8a] transition-colors">    
                    Mahasiswa dan Dosen Unpad melakukan PPM di Desa Cikalong, Pangandaran
                </Link>
              </h3>
              <p className="text-xs font-semibold text-[#1e3a8a] mb-3 tracking-wider uppercase">Juni 2025 • Kumparan.com</p>
              <p className="text-gray-600 leading-relaxed">Artikel terbaru tentang Kegiatan PPM mahasiswa dan Dosen Unpad di Desa Cikalong, Kabupaten pangandaran. Simak Selengkapnya.</p>
            </div>

            <div className="card hover:-translate-y-2 transition-transform duration-300">
              <h3 className="card-title text-xl">
                <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:text-[#1e3a8a] transition-colors">    
                     Peran Sumber Daya Manusia dalam Pelestarian Tradisi Hajat Bumi dan Ngabuku Taun di Desa Cikalong
                </Link>
              </h3>
              <p className="text-xs font-semibold text-[#1e3a8a] mb-3 tracking-wider uppercase">Juni 2025 • abc.com</p>
              <p className="text-gray-600 leading-relaxed">Hajat Bumi (perayaan bumi) dan Ngabuku Taun (ritual tahun baru atau panen) merupakan acara di Desa Cikalong sebagai bentuk rasa Syukur masyarakat kepada alam dan Tuhan atas hasil panen yang melimpah.</p>
            </div>

            <div className="card hover:-translate-y-2 transition-transform duration-300">
              <h3 className="card-title text-xl">
                <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:text-[#1e3a8a] transition-colors">
                    Cikalong, Desa Kecil dengan Orang-Orang Hebat Penjaga Warisan
                </Link>
              </h3>
              <p className="text-xs font-semibold text-[#1e3a8a] mb-3 tracking-wider uppercase">Juni 2025 • abc.com</p>
              <p className="text-gray-600 leading-relaxed">Mengangkat kisah inspiratif tokoh-tokoh luar biasa dari Desa Cikalong, mulai dari penjaga seni, tradisi, dan usaha lokal yang patut kita kenal dan hargai.</p>
            </div>
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
            <div className="card flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 mb-6 overflow-hidden rounded-xl">
                <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-24%20at%2012.18.27_79ab0ebc.jpg?updatedAt=1750742589442" alt="UMKM Opak Cikalong" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">UMKM Opak Cikalong</h3>
              <div className="space-y-2 text-sm text-gray-600 flex-1">
                <p><strong className="text-gray-900">Produk:</strong> Opak khas Cikalong</p>
                <p><strong className="text-gray-900">Pemilik:</strong> Ibu Kisah</p>
                <p><strong className="text-gray-900">Alamat:</strong> Nagrak Dusun Cimanggu</p>
              </div>
            </div>

            <div className="card flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 mb-6 overflow-hidden rounded-xl">
                <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/DSC_0566.JPG?updatedAt=1750742523060" alt="UMKM Sari Mukti Keripik" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">UMKM Sari Mukti Keripik</h3>
              <div className="space-y-2 text-sm text-gray-600 flex-1">
                <p><strong className="text-gray-900">Produk:</strong> Aneka jenis keripik</p>
                <p><strong className="text-gray-900">Pemilik:</strong> Bapak Sajim dan Ibu Asna</p>
                <p><strong className="text-gray-900">Alamat:</strong> Jln. Kalikopi, Dusun Cikalong</p>
                <p className="mt-4 italic">Sari Mukti memproduksi aneka keripik khas dari Desa Cikalong, seperti pisang, sale, singkong, ubi, peyek, dan lainnya.</p>
              </div>
            </div>

            <div className="card flex flex-col hover:-translate-y-2 transition-transform duration-300 md:col-span-2 lg:col-span-1">
              <div className="h-48 mb-6 overflow-hidden rounded-xl">
                <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-24%20at%2012.17.57_50d28fe6.jpg?updatedAt=1750742589463" alt="Pulo Sangkuriang Barokah" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Pulo Sangkuriang Barokah</h3>
              <div className="space-y-2 text-sm text-gray-600 flex-1">
                <p><strong className="text-gray-900">Produk:</strong> Bibit & Ikan Konsumsi Mujaer</p>
                <p><strong className="text-gray-900">Pemilik:</strong> Bapak Ruswan (Pak Kancil)</p>
                <p><strong className="text-gray-900">Alamat:</strong> Desa Cikalong</p>
                <p className="mt-4 italic">Memanfaatkan sumber air di Desa Cikalong yang dimulai dari kolam sawah hingga berkembang pesat.</p>
              </div>
            </div>
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
                    <span className="text-gray-600">+62 853-2013-9810 (Endi)</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">✉️</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">Email Desa</strong>
                    <span className="text-gray-600 break-all">cikalongpangandaran@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📱</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">Media Sosial</strong>
                    <span className="text-gray-600 block text-sm">IG: @desacikalongpnd</span>
                    <span className="text-gray-600 block text-sm">TikTok: @desacikalongpnd</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📍</div>
                  <div>
                    <strong className="block text-gray-900 mb-1">Alamat Kantor</strong>
                    <span className="text-gray-600 text-sm block mb-2">Jl. Cikalong - Sidamulih No. 45<br/>Kec. Sidamulih, Pangandaran</span>
                    <Link href="https://maps.app.goo.gl/iA7iBmdSFGnWFdpK9" target="_blank" className="text-[#f59e0b] hover:text-[#1e3a8a] font-medium text-sm transition-colors">Lihat di Google Maps &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="card md:col-span-2 bg-[#1e3a8a] text-white">
              <h3 className="card-title text-white border-b border-[#f59e0b]/50 pb-4 mb-6 text-2xl">Jam Pelayanan</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Senin - Jumat</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">08.00 - 14.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sabtu</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">08.00 - 12.00</span>
                </div>
                <div className="flex justify-between items-center text-[#f0e6d2]">
                  <span className="font-medium">Minggu</span>
                  <span className="bg-black/20 px-3 py-1 rounded-full text-sm font-semibold">Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
