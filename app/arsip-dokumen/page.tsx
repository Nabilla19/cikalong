import Header from '../components/Header';
import Footer from '../components/Footer';
import ZoomableImage from '../components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArsipDokumenPage() {
  const { data: arsip } = await supabase.from('arsip_dokumen').select('*').order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <div className="pt-8 min-h-screen flex flex-col">
        <section className="section bg-light flex-1">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="section-title text-center">Arsip & Dokumentasi</h1>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Kumpulan dokumentasi kegiatan dan informasi publik Desa Cikalong</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {arsip?.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative h-64 overflow-hidden">
                    <ZoomableImage 
                      src={item.file_url} 
                      alt={item.judul} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 line-clamp-3 leading-snug">{item.judul}</h3>
                  </div>
                </div>
              ))}
            </div>

            {(!arsip || arsip.length === 0) && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="text-4xl mb-4">📸</div>
                <p className="text-gray-500 font-medium">Belum ada dokumentasi yang diunggah.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
