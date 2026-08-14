import Header from '../components/Header';
import Footer from '../components/Footer';
import ZoomableImage from '../components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BeritaPage() {
  const { data: berita } = await supabase.from('berita').select('*').order('diterbitkan_pada', { ascending: false });

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        <section id="berita" className="section flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Berita Desa</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {berita?.map((item: any) => (
                <div key={item.id} className="card hover:-translate-y-2 transition-transform duration-300">
                  {item.foto_url && (
                    <ZoomableImage src={item.foto_url} alt={item.judul} className="w-full h-48 object-cover rounded-xl mb-4" />
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
      </div>
      <Footer />
    </>
  );
}
