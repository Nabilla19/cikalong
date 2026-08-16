import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BeritaPage() {
  const berita = await prisma.berita.findMany({
    orderBy: { diterbitkan_pada: 'desc' }
  });

  return (
    <>
      <Header />
      <div className="pt-8 min-h-screen flex flex-col bg-slate-50">
        <section id="berita" className="section flex-1">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#1e3a8a] mb-4 font-serif">Berita Desa</h1>
              <div className="h-1 w-24 bg-[#f59e0b] mx-auto rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {berita?.map((item: any) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    {item.foto_url ? (
                      <img src={item.foto_url} alt={item.judul} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">📰</div>
                    )}
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {new Date(item.diterbitkan_pada).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2 leading-snug">
                      {item.judul}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                      {item.isi}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        Administrator
                      </div>
                      <Link href={`/berita/${item.id}`} className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors">
                        Baca
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {(!berita || berita.length === 0) && (
                <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-slate-500 font-medium">Belum ada berita yang diterbitkan.</p>
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
