import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StrukturPage() {
  const { data: struktur } = await supabase.from('struktur_organisasi').select('*').order('urutan', { ascending: true });

  const strukturData = struktur || [];
  const groupedStruktur = strukturData.reduce((acc: any, curr: any) => {
    if (!acc[curr.urutan]) acc[curr.urutan] = [];
    acc[curr.urutan].push(curr);
    return acc;
  }, {});
  const sortedUrutan = Object.keys(groupedStruktur).sort((a, b) => Number(a) - Number(b));

  return (
    <>
      <Header />
      <div className="pt-8 min-h-screen flex flex-col">
        <section id="struktur" className="section bg-light flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Struktur Perangkat Desa</h1>
            </div>
            <div className="max-w-4xl mx-auto mt-12 pb-12 overflow-x-auto">
              {struktur && struktur.length > 0 ? (
                <table className="w-full text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
                  <thead className="bg-[#1e3a8a] text-white">
                    <tr>
                      <th className="py-4 px-6 font-semibold">No</th>
                      <th className="py-4 px-6 font-semibold">Jabatan</th>
                      <th className="py-4 px-6 font-semibold">Nama Lengkap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {struktur.map((item: any, index: number) => (
                      <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                        <td className="py-4 px-6 font-bold text-gray-800">{item.jabatan}</td>
                        <td className="py-4 px-6 text-gray-700 uppercase">{item.nama}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-500">Struktur perangkat desa belum diisi.</p>
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
