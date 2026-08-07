import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon-footer"></div>
              <h2>Desa Cikalong</h2>
            </div>
            <p className="footer-desc">
              Portal informasi resmi Desa Cikalong. Kami berkomitmen untuk memberikan pelayanan publik terbaik dan transparan kepada masyarakat.
            </p>
          </div>

          <div className="footer-section">
            <h3>Tautan Cepat</h3>
            <ul>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="#">Profil Desa</Link></li>
              <li><Link href="#">Pemerintahan</Link></li>
              <li><Link href="#">Berita Terbaru</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Kontak</h3>
            <ul className="contact-info">
              <li>📍 Jl. Raya Cikalong No. 123, Kecamatan Cikalong</li>
              <li>📧 info@cikalong.desa.id</li>
              <li>📞 (0265) 123456</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Desa Cikalong, Kabupaten Pangandaran. Hak cipta dilindungi.</p>
          <p className="mt-1 text-sm text-gray-400">Website Resmi Pemerintah Desa Cikalong</p>
          <p className="mt-1 text-sm text-gray-400">PPM Unpad 2025</p>
        </div>
      </div>
    </footer>
  );
}
