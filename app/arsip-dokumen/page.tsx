import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArsipDokumenPage() {
  const { data: arsip } = await supabase.from('arsip_dokumen').select('*').order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        <section className="section bg-light flex-1">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="section-title text-center">Arsip Dokumen</h1>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Kumpulan arsip dokumen dan informasi publik Desa Cikalong</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {arsip?.map((item: any) => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 text-xl">
                      📁
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.judul}</h3>
                      <p className="text-sm text-gray-500 mt-1">Diunggah: {new Date(item.created_at).toLocaleDateString('id-ID')}</p>
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
              ))}
              
              {(!arsip || arsip.length === 0) && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500">Belum ada arsip dokumen yang diunggah.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
