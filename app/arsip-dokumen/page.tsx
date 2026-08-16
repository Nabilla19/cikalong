import Header from '../components/Header';
import Footer from '../components/Footer';
import ZoomableImage from '../components/ZoomableImage';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArsipDokumenPage() {
  const arsip = await prisma.arsipDokumen.findMany({
    orderBy: { created_at: 'desc' }
  });

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
              {arsip?.map((item: any) => {
                const isImage = item.file_url?.toLowerCase().match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/) !== null;
                return (
                <div key={item.id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col ${!isImage ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}`}>
                  {isImage ? (
                    <>
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
                    </>
                  ) : (
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 h-full w-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 text-xl">
                          📄
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{item.judul}</h3>
                          <p className="text-sm text-gray-500 mt-1">{new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                        </div>
                      </div>
                      <a 
                        href={item.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm shrink-0"
                      >
                        Buka Dokumen
                      </a>
                    </div>
                  )}
                </div>
              )})}
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
