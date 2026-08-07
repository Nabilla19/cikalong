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
          <h1 className="section-title text-center">Selamat Datang di Website Digital Desa Cikalong</h1>
          
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
            <h3 className="card-title">Sambutan Kepala Desa</h3>
            <div className="sambutan-text">
              <p>Assalamu’alaikum Warahmatullahi Wabarakatuh,</p>
              <p>Salam sejahtera,</p>
              <br/>
              <p>Selamat datang di website resmi Desa Cikalong.</p>
              <p>Website ini kami hadirkan sebagai sarana informasi, komunikasi, dan transparansi pelayanan publik kepada masyarakat.</p>
              <br/>
              <p>Dengan semangat "Ngahiji Ku Rasa, Ngahaja Ku Karsa, Ngajayakeun Cikalong", mari kita bersama membangun desa yang maju, mandiri, dan berbudaya.</p>
              <br/>
              <p>Terima kasih atas kunjungan Anda. Saran dan masukan sangat kami harapkan demi kemajuan bersama.</p>
              <br/>
              <p>Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
              <br/>
              <p><strong>Ruspandi</strong></p>
            </div>
          </div>

          <h2 className="section-subtitle mt-12">Pandangan Umum Masyarakat</h2>
          <div className="grid-staff mt-6">
            {masyarakat.map((item, idx) => (
              <div key={idx} className="staff-card">
                <div className="staff-photo">{item.inisial}</div>
                <h3>{item.nama}</h3>
                <p><strong>{item.jabatan}</strong></p>
                <p>{item.kutipan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFIL DESA */}
      <section id="profil" className="section">
        <div className="container">
          <h1 className="section-title">Profil Desa Cikalong</h1>
          
          <div className="card">
            <h3 className="card-title">Sejarah Desa</h3>
            <p>
              Desa Cikalong yang terletak di Kecamatan Sidamulih, Kabupaten Pangandaran, memiliki sejarah panjang yang sarat nilai budaya dan kearifan lokal. Berdiri sejak abad ke-18, desa ini awalnya merupakan wilayah adat yang dipimpin oleh para sesepuh seperti Eyang Raksa Dipa (Ki Gede Mataram) dan kemudian dilanjutkan oleh Eyang Pradjawidjaya Diningrat, seorang tokoh pelarian dari pasukan Pangeran Diponegoro. Nama “Cikalong” sendiri memiliki dua makna filosofis, yakni sebagai tempat awal berdirinya pemerintahan ("Cikal" berarti awal, "Long" dari elong berarti pemekaran), serta merujuk pada sumber air bawah tanah yang mengalir ke Sungai Cijumbleng.
            </p>
            <br/>
            <p>
              Secara resmi dan administratif, Desa Cikalong berdiri pada Juli 1978 sebagai hasil pemekaran dari Desa Sukaresik. Hingga saat ini, Desa Cikalong masih melestarikan kearifan lokal, nilai-nilai spiritual, serta sistem gotong royong sebagai bentuk rasa syukur dan penghormatan terhadap alam serta leluhur.
            </p>
          </div>

          <div className="card mt-6">
            <h3 className="card-title">Visi Desa</h3>
            <p>Pembangunan Yang Berkelanjutan untuk Mewujudkan Desa Budaya dengan Menitikberatkan PADA PENDIDIKAN AGAMA DAN KARAKTER.</p>
          </div>

          <div className="card mt-6">
            <h3 className="card-title">Misi Desa</h3>
            <ul className="list-disc pl-6">
              <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.</li>
              <li>Membangun infrastruktur desa yang memadai dan berwawasan lingkungan.</li>
              <li>Melestarikan budaya dan kearifan lokal Desa Cikalong.</li>
              <li>Memberdayakan ekonomi kerakyatan melalui UMKM dan pariwisata.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* STRUKTUR */}
      <section id="struktur" className="section bg-light">
        <div className="container">
          <h1 className="section-title">Struktur Perangkat Desa</h1>
          <div className="text-center mt-6">
            <img 
              src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/Orgabigram%20Desa%20Cikalong%20(1500%20x%201920%20px).png?updatedAt=1750776307636" 
              alt="Struktur Organisasi" 
              className="rounded-xl shadow-lg w-full max-w-4xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* GEOGRAFI */}
      <section id="geografi" className="section">
        <div className="container">
          <h1 className="section-title">Geografi Desa Cikalong</h1>
          
          <div className="card">
            <h3 className="card-title">Lokasi dan Wilayah</h3>
            <img 
              src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-20%20at%2016.51.22_09ceb57c.jpg?updatedAt=1750776306995" 
              alt="Geografi Cikalong"
              className="rounded-xl shadow border-4 border-white my-4 mx-auto block max-w-lg w-full"
            />
            <p>Desa Cikalong terletak di Kecamatan Sidamulih, Kabupaten Pangandaran, Jawa Barat. Berdiri pada Juli 1978 sebagai hasil pemekaran dari Desa Sukaresik, desa ini dikenal dengan potensi alam dan budaya lokal yang kuat.</p>
          </div>

          <div className="card mt-6">
            <h3 className="card-title">Batas Wilayah</h3>
            <ul className="list-disc pl-6">
              <li><strong>Utara:</strong> Desa Kersaratu</li>
              <li><strong>Selatan:</strong> Desa Sukaresik</li>
              <li><strong>Timur:</strong> Desa Sidamulih</li>
              <li><strong>Barat:</strong> Desa Bojong</li>
            </ul>
          </div>

          <div className="card mt-6">
            <h3 className="card-title">Kondisi Geografis</h3>
            <p>Secara geografis, Desa Cikalong memiliki karakteristik alam yang khas, berupa wilayah perbukitan yang berhawa sejuk dengan suhu rata-rata sekitar 37°C. Hamparan sawah seluas hampir 949 hektar (tepatnya 948,778 Ha) menjadi bagian penting dari lanskap desa, sekaligus penopang sektor pertaniannya.</p>
          </div>
        </div>
      </section>

      {/* AKTIVITAS & BUDAYA */}
      <section id="aktivitas" className="section bg-light">
        <div className="container">
          <h1 className="section-title">Aktivitas & Budaya Desa Cikalong</h1>
          <h2 className="section-subtitle mt-8 mb-6">Budaya</h2>
          
          <div className="grid-budaya">
            {budaya.map((b, i) => (
              <div key={i} className="card p-0 overflow-hidden flex flex-col">
                <img src={b.img} alt={b.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-1">
                  <h3 className="card-title">{b.title}</h3>
                  <p className="text-gray-600">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* BERITA */}
      <section id="berita" className="section">
        <div className="container">
          <h1 className="section-title">Berita Desa</h1>
          
          <div className="card">
            <h3 className="card-title">
              <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:underline">    
                  Desa Cikalong: Wisata Budaya yang Masih Melestarikan Tradisi Leluhur
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-2">Dipublikasikan : 18 Juni 2025 | Media Publikasi: Kumparan.com</p>
            <p>Artikel ini menggambarkan keunikan lokal desa, mulai dari aktivitas seni budaya, sejarah yang hidup dalam keseharian warga, hingga nilai-nilai kearifan lokal yang terus dijaga.</p>
          </div>

          <div className="card mt-4">
            <h3 className="card-title">
              <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:underline">    
                  Mahasiswa dan Dosen Unpad melakukan PPM di Desa Cikalong, Pangandaran
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-2">Dipublikasikan : Juni 2025 | Media Publikasi: Kumparan.com</p>
            <p>Artikel terbaru tentang Kegiatan PPM mahasiswa dan Dosen Unpad di Desa Cikalong, Kabupaten pangandaran. Simak Selengkapnya.</p>
          </div>

          <div className="card mt-4">
            <h3 className="card-title">
              <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:underline">    
                   Peran Sumber Daya Manusia dalam Pelestarian Tradisi Hajat Bumi dan Ngabuku Taun di Desa Cikalong
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-2">Dipublikasikan : Juni 2025 | Media Publikasi: abc.com</p>
            <p>Hajat Bumi (perayaan bumi) dan Ngabuku Taun (ritual tahun baru atau panen) merupakan acara di Desa Cikalong sebagai bentuk rasa Syukur masyarakat kepada alam dan Tuhan atas hasil panen yang melimpah.</p>
          </div>

          <div className="card mt-4">
            <h3 className="card-title">
              <Link href="https://kumparan.com/rully-a/25HNgjkoO9H?utm_source=Desktop&utm_medium=copy-to-clipboard&shareID=HHLU1mtYsQFc" target="_blank" className="hover:underline">
                  Cikalong, Desa Kecil dengan Orang-Orang Hebat Penjaga Warisan
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-2">Dipublikasikan : Juni 2025 | Media Publikasi: abc.com</p>
            <p>Mengangkat kisah inspiratif tokoh-tokoh luar biasa dari Desa Cikalong, mulai dari penjaga seni, tradisi, dan usaha lokal yang patut kita kenal dan hargai.</p>
          </div>
        </div>
      </section>

      {/* UMKM */}
      <section id="umkm" className="section bg-light">
        <div className="container">
          <h1 className="section-title">UMKM Desa Cikalong</h1>
          
          <div className="grid grid-cols-1 gap-8 mt-6">
            <div className="card">
              <h3 className="text-center text-xl font-bold mb-4 text-[#2E7D32]">UMKM Opak Cikalong</h3>
              <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-24%20at%2012.18.27_79ab0ebc.jpg?updatedAt=1750742589442" alt="UMKM Opak Cikalong" className="w-full max-w-lg mx-auto rounded-xl border-4 border-white shadow-sm mb-4"/>
              <p><strong>Produk:</strong> Opak khas Cikalong</p>
              <p><strong>Pemilik:</strong> Ibu Kisah</p>
              <p><strong>Kontak:</strong> -</p>
              <p><strong>Alamat:</strong> Nagrak Dusun Cimanggu, Desa Cikalong</p>
            </div>

            <div className="card">
              <h3 className="text-center text-xl font-bold mb-4 text-[#2E7D32]">UMKM Sari Mukti Keripik</h3>
              <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/DSC_0566.JPG?updatedAt=1750742523060" alt="UMKM Sari Mukti Keripik" className="w-full max-w-lg mx-auto rounded-xl border-4 border-white shadow-sm mb-4"/>
              <p><strong>Produk:</strong> Aneka jenis keripik</p>
              <p><strong>Pemilik:</strong> Bapak Sajim dan Ibu Asna</p>
              <p><strong>Kontak:</strong> -</p>
              <p><strong>Alamat:</strong> Jln. Kalikopi, Dusun Cikalong, Desa Cikalong</p>
              <p className="mt-2">Sari Mukti merupakan usaha rumahan yang memproduksi aneka keripik khas dari Desa Cikalong, seperti keripik pisang, keripik sale, keripik singkong, keripik ubi, peyek, dan lainnya.</p>
            </div>

            <div className="card">
              <h3 className="text-center text-xl font-bold mb-4 text-[#2E7D32]">Kelompok Budidaya Ikan (Pokdakan) Pulo Sangkuriang Barokah</h3>
              <img src="https://ik.imagekit.io/klccxl9cu/Web%20Desa/WhatsApp%20Image%202025-06-24%20at%2012.17.57_50d28fe6.jpg?updatedAt=1750742589463" alt="Pulo Sangkuriang Barokah" className="w-full max-w-lg mx-auto rounded-xl border-4 border-white shadow-sm mb-4"/>
              <p><strong>Produk:</strong> Bibit - Ikan Konsumsi Ikan Mujaer</p>
              <p><strong>Pemilik:</strong> Bapak Ruswan</p>
              <p><strong>Kontak:</strong> -</p>
              <p><strong>Alamat:</strong> Desa Cikalong</p>
              <p className="mt-2">Pak Ruswan atau yang akrab disapa Bapak Kancil merupakan pemilik sekaligus pencetus Pulo Sangkuriang Barokah, memanfaatkan sumber air di Desa Cikalong yang dimulai dari kolam sawah, dengan tangan dingin Pak Kancil membuat Pulo Sangkuriang Barokah berkembang hingga seperti saat ini</p>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="section">
        <div className="container">
          <h1 className="section-title">Kontak Desa Cikalong</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="card-title">Informasi Kontak</h3>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <strong>WhatsApp Petugas Pelayanan</strong><br/>
                    +62 853-2013-9810 (Endi)
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <strong>Social Media</strong><br/>
                    Instagram: @desacikalongpnd<br/>
                    TikTok: @desacikalongpnd<br/>
                    Facebook: Deci Pangandaran
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <strong>Email Desa</strong><br/>
                    cikalongpangandaran@gmail.com
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <strong>Alamat Kantor Desa</strong><br/>
                    Jl. Cikalong - Sidamulih No. 45, Desa Cikalong<br/>
                    Kecamatan Sidamulih, Kabupaten Pangandaran<br/>
                    Jawa Barat 46365<br/>
                    <a href="https://maps.app.goo.gl/iA7iBmdSFGnWFdpK9" target="_blank" className="text-blue-600 hover:underline">Lihat di Google Maps</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card h-fit">
              <h3 className="card-title">Jam Pelayanan</h3>
              <div className="mt-4 space-y-2">
                <p><strong>Senin - Jumat:</strong> 08.00 - 14.00 WIB</p>
                <p><strong>Sabtu:</strong> 08.00 - 12.00 WIB</p>
                <p><strong>Minggu:</strong> Tutup</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
