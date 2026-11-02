import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper: parse teks biasa jadi paragraf + link yang bisa diklik
function renderIsiBerita(isi: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const lines = isi.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(urlRegex);
    return (
      <span key={lineIdx}>
        {parts.map((part, i) => {
          const isUrl = /^https?:\/\//.test(part);
          if (isUrl) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb', textDecoration: 'underline', textUnderlineOffset: '4px', wordBreak: 'break-all', fontWeight: '500' }}
              >
                {part}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const berita = await prisma.berita.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!berita) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Berita tidak ditemukan</h1>
          <p className="text-slate-500 mb-6">Berita yang Anda cari mungkin telah dihapus.</p>
          <Link href="/berita" className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium">
            Kembali ke Berita
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-8 min-h-screen flex flex-col bg-slate-50">
        <section className="section flex-1">
          <div className="container max-w-3xl mx-auto px-4 pb-16">
            <Link href="/berita" className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 mb-8 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Kembali
            </Link>

            <article className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full">
                  {new Date(berita.diterbitkan_pada).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </span>
                <span className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Administrator
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 leading-tight font-serif">
                {berita.judul}
              </h1>

              {berita.foto_url && (
                <div className="mb-10 rounded-2xl overflow-hidden bg-slate-100 shadow-inner flex items-center justify-center">
                  {/* object-contain agar foto tidak terpotong, max height dibatasi */}
                  <img
                    src={berita.foto_url}
                    alt={berita.judul}
                    className="w-full max-h-[600px] object-contain"
                  />
                </div>
              )}

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed text-lg">
                  {renderIsiBerita(berita.isi)}
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
