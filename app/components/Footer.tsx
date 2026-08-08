import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section text-center">
            <div className="footer-logo">
              <div className="logo-icon-footer"></div>
              <h2>Desa Cikalong</h2>
            </div>
            <p className="footer-desc mx-auto max-w-2xl">
              Portal informasi resmi Desa Cikalong. Kami berkomitmen untuk memberikan pelayanan publik terbaik dan transparan kepada masyarakat.
            </p>
          </div>




        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Desa Cikalong, Kabupaten Pangandaran. Hak cipta dilindungi.</p>
          <p className="mt-1 text-sm text-gray-400">Website Resmi Pemerintah Desa Cikalong</p>
          <p className="mt-1 text-sm font-bold text-[#b94e3e]">PPM UIN Suska 2026</p>
        </div>
      </div>
    </footer>
  );
}
