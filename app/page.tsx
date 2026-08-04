import Link from 'next/link';

export default function Home() {
  const potensi = [
    {
      title: "Pertanian & Perkebunan",
      desc: "Menghasilkan padi unggulan dan sayuran organik yang mendistribusikan ke berbagai kota.",
      icon: "🌾"
    },
    {
      title: "Pariwisata Alam",
      desc: "Destinasi wisata alam yang asri dengan pemandangan pegunungan dan air terjun yang memukau.",
      icon: "🏞️"
    },
    {
      title: "UMKM Kreatif",
      desc: "Pusat kerajinan tangan dan produk lokal yang memberdayakan ekonomi warga.",
      icon: "🛍️"
    },
    {
      title: "Budaya Lokal",
      desc: "Melestarikan tradisi seni tari dan musik daerah yang rutin dipentaskan.",
      icon: "🎭"
    }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Website Resmi</span>
          <h1 className="hero-title">Selamat Datang di Website Resmi<br/>Desa Cikalong</h1>
          <p className="hero-subtitle">
            Sumber informasi resmi mengenai berita terbaru, layanan publik, dan potensi lokal desa kami.
          </p>
          <div className="hero-actions">
            <Link href="https://wa.me/6281234567890" target="_blank" className="btn-primary">
              <span className="wa-icon">💬</span> Hubungi via WhatsApp
            </Link>
            <Link href="#profil" className="btn-secondary">
              Jelajahi Desa
            </Link>
          </div>
        </div>
      </section>

      {/* SEKILAS DESA */}
      <section id="profil" className="section bg-light">
        <div className="container sekilas-grid">
          <div className="sekilas-text">
            <h2 className="section-title">Sekilas Desa Cikalong</h2>
            <div className="title-underline"></div>
            <p className="section-desc">
              Desa Cikalong adalah desa berkembang yang terletak di jantung alam yang asri. 
              Dengan mayoritas penduduk yang bekerja di sektor agraris dan pariwisata kreatif, 
              kami terus berinovasi untuk mewujudkan masyarakat yang sejahtera, mandiri, dan berbudaya.
            </p>
            <ul className="sekilas-stats">
              <li>
                <strong>2,500+</strong>
                <span>Penduduk</span>
              </li>
              <li>
                <strong>5</strong>
                <span>Dusun</span>
              </li>
              <li>
                <strong>120 Ha</strong>
                <span>Luas Wilayah</span>
              </li>
            </ul>
          </div>
          <div className="sekilas-image">
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1532185984656-7871b68903c7?q=80&w=800&auto=format&fit=crop" 
                alt="Pemandangan Desa" 
              />
              <div className="image-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* POTENSI & UNGGULAN */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Potensi & Unggulan</h2>
            <div className="title-underline center"></div>
            <p className="section-subtitle">Jelajahi berbagai kekayaan alam dan kreativitas yang menjadi kebanggaan Desa Cikalong.</p>
          </div>

          <div className="potensi-grid">
            {potensi.map((item, index) => (
              <div key={index} className="potensi-card">
                <div className="potensi-icon">{item.icon}</div>
                <h3 className="potensi-title">{item.title}</h3>
                <p className="potensi-desc">{item.desc}</p>
                <Link href="#" className="potensi-link">Pelajari lebih lanjut &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
