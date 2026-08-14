import Header from '../components/Header';
import Footer from '../components/Footer';
import ZoomableImage from '../components/ZoomableImage';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UMKMPage() {
  const { data: umkm } = await supabase.from('umkm').select('*').order('nama_usaha', { ascending: true });

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        <section id="umkm" className="section bg-light flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">UMKM Desa Cikalong</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {umkm?.map((item: any) => (
                <div key={item.id} className="card flex flex-col hover:-translate-y-2 transition-transform duration-300">
                  {item.foto_url && (
                    <div className="h-48 mb-6 overflow-hidden rounded-xl">
                      <ZoomableImage src={item.foto_url} alt={item.nama_usaha} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">{item.nama_usaha}</h3>
                  <div className="space-y-2 text-sm text-gray-600 flex-1">
                    <p><strong className="text-gray-900">Produk:</strong> {item.produk}</p>
                    <p><strong className="text-gray-900">Pemilik:</strong> {item.pemilik}</p>
                    <p><strong className="text-gray-900">Alamat:</strong> {item.alamat}</p>
                    <p className="mt-4 italic">{item.deskripsi}</p>
                  </div>
                  {item.no_wa && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <a 
                        href={`https://wa.me/${item.no_wa.replace(/\D/g,'')}?text=Halo%20${encodeURIComponent(item.nama_usaha)},%20saya%20melihat%20produk%20Anda%20di%20Website%20Desa%20Cikalong%20dan%20ingin%20bertanya/memesan.`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-4 rounded-xl font-bold transition-all w-full shadow-sm hover:shadow-md"
                      >
                        💬 Pesan via WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              ))}
              {(!umkm || umkm.length === 0) && (
                <p className="col-span-full text-center text-gray-500 py-8">Belum ada data UMKM.</p>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
