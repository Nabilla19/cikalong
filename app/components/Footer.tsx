import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function Footer() {
  const { data: pengaturan } = await supabase.from('pengaturan_web').select('*').eq('id', 1).single();
  const teksFooter = pengaturan?.teks_footer || 'PPM UIN Suska 2026';

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section text-center flex flex-col items-center">
            <div className="footer-logo">
              <div className="logo-icon-footer"></div>
              <h2>Desa Cikalong</h2>
            </div>
            <p className="footer-desc mx-auto max-w-2xl text-center">
              Portal informasi resmi Desa Cikalong. Kami berkomitmen untuk memberikan pelayanan publik terbaik dan transparan kepada masyarakat.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Desa Cikalong, Kabupaten Pangandaran. Hak cipta dilindungi.</p>
          <p className="mt-1 text-sm text-gray-400">Website Resmi Pemerintah Desa Cikalong</p>
          <p className="mt-1 text-sm font-bold text-[#b94e3e]">{teksFooter}</p>
        </div>
      </div>
    </footer>
  );
}
