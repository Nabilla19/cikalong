import Header from '../components/Header';
import Footer from '../components/Footer';
import ZoomableImage from '../components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GeografiPage() {
  const { data: geografi } = await supabase.from('geografi').select('*').eq('id', 1).single();

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        <section id="geografi" className="section flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Geografi Desa Cikalong</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card h-full">
                <h3 className="card-title">Lokasi dan Wilayah</h3>
                <ZoomableImage
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
      </div>
      <Footer />
    </>
  );
}
