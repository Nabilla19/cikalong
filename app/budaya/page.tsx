import Header from '../components/Header';
import Footer from '../components/Footer';
import ZoomableImage from '../components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BudayaPage() {
  const { data: budaya } = await supabase.from('budaya').select('*').order('judul', { ascending: true });

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        <section id="aktivitas" className="section flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Aktivitas & Budaya Desa</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {budaya?.map((item: any) => (
                <div key={item.id} className="card hover:-translate-y-2 transition-transform duration-300">
                  {item.foto_url && (
                    <ZoomableImage src={item.foto_url} alt={item.judul} className="w-full h-48 object-cover rounded-xl mb-4" />
                  )}
                  <h3 className="card-title text-xl">{item.judul}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.deskripsi}</p>
                </div>
              ))}
              {(!budaya || budaya.length === 0) && (
                <p className="col-span-full text-center text-gray-500 py-8">Belum ada data aktivitas & budaya.</p>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
