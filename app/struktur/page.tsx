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
      <div className="pt-24 min-h-screen flex flex-col">
        <section id="struktur" className="section bg-light flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Struktur Perangkat Desa</h1>
            </div>
            <div className="org-chart-container mt-12 pb-12">
              <div className="min-w-full md:min-w-full lg:min-w-[1000px] flex flex-col items-center overflow-x-hidden md:overflow-x-visible gap-10">
                {sortedUrutan.length > 0 ? (
                  sortedUrutan.map((uStr, levelIndex) => {
                    const items = groupedStruktur[uStr];
                    const isTopLevel = levelIndex === 0;
                    const isSecondLevel = levelIndex === 1 && items.length === 1;

                    if (isTopLevel && items.length === 1) {
                      const kades = items[0];
                      return (
                        <div key={uStr} className="org-node relative z-10 w-full flex flex-col items-center">
                          <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-6 py-5 rounded-lg shadow-lg text-center w-80 relative">
                            <h3 className="font-serif text-sm mb-1">{kades.jabatan}</h3>
                            <p className="font-black text-2xl uppercase tracking-wide">{kades.nama}</p>
                          </div>
                        </div>
                      );
                    }

                    if (isSecondLevel) {
                      const sekdes = items[0];
                      return (
                        <div key={uStr} className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                          <div className="w-72 flex flex-col items-center">
                            <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-6 py-4 rounded-lg shadow-lg text-center w-full relative z-10">
                              <h3 className="font-serif text-sm mb-1">{sekdes.jabatan}</h3>
                              <p className="font-black text-xl uppercase">{sekdes.nama}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={uStr} className="flex flex-wrap justify-center items-center md:items-start w-full max-w-5xl mx-auto relative z-10 gap-6 md:gap-6 mb-4">
                        {items.map((item: any, idx: number) => (
                          <div key={item.id || idx} className="flex flex-col items-center w-64 mb-4">
                            <div className="org-box border-l-8 border-[var(--primary)] bg-gradient-to-r from-[var(--accent)] to-[#fde68a] text-[var(--foreground)] px-4 py-3 rounded shadow text-center w-full">
                              <h3 className="font-serif text-xs mb-1">{item.jabatan}</h3>
                              <p className="font-bold text-sm uppercase">{item.nama}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 py-8 text-center w-full">Struktur perangkat desa belum diisi.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
