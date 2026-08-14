import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function KontakPage() {
  const { data: pengaturan } = await supabase.from('pengaturan_web').select('*').eq('id', 1).single();

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        <section id="kontak" className="section flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Hubungi Kami</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
              <div className="card md:col-span-3">
                <h3 className="card-title text-2xl mb-6">Informasi Kontak</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📞</div>
                    <div>
                      <strong className="block text-gray-900 mb-1">WhatsApp Pelayanan</strong>
                      <span className="text-gray-600">{pengaturan?.wa || '+62 853-2013-9810 (Endi)'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">✉️</div>
                    <div>
                      <strong className="block text-gray-900 mb-1">Email Desa</strong>
                      <span className="text-gray-600 break-all">{pengaturan?.email || 'cikalongpangandaran@gmail.com'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📱</div>
                    <div>
                      <strong className="block text-gray-900 mb-1">Media Sosial</strong>
                      <span className="text-gray-600 block text-sm">{pengaturan?.instagram || 'IG: @desacikalongpnd'}</span>
                      <span className="text-gray-600 block text-sm">{pengaturan?.facebook || 'TikTok: @desacikalongpnd'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f0e6d2] text-[#1e3a8a] flex items-center justify-center text-2xl shadow-sm shrink-0">📍</div>
                    <div>
                      <strong className="block text-gray-900 mb-1">Alamat Kantor</strong>
                      <span className="text-gray-600 text-sm block mb-2">Jl. Cikalong - Sidamulih No. 45<br />Kec. Sidamulih, Pangandaran</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card md:col-span-2">
                <h3 className="card-title border-b border-[#1e3a8a]/20 pb-4 mb-6 text-2xl">Jam Pelayanan</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Senin - Jumat</span>
                    <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm font-semibold">08.00 - 14.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Sabtu</span>
                    <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm font-semibold">08.00 - 12.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Minggu</span>
                    <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold line-through">Tutup</span>
                  </div>
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
