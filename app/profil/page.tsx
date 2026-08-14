import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProfilPage() {
  const { data: profil } = await supabase.from('profil_desa').select('*').eq('id', 1).single();

  const misiArray = profil?.misi ? profil.misi.split('\n').filter(Boolean) : [
    'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.',
    'Membangun infrastruktur desa yang memadai dan berwawasan lingkungan.',
    'Melestarikan budaya dan kearifan lokal Desa Cikalong.',
    'Memberdayakan ekonomi kerakyatan melalui UMKM dan pariwisata.'
  ];

  return (
    <>
      <Header />
      <div className="pt-8 min-h-screen flex flex-col">
        <section id="profil" className="section flex-1">
          <div className="container">
            <div className="text-center">
              <h1 className="section-title text-center">Profil Desa Cikalong</h1>
            </div>

            <div className="card">
              <h3 className="card-title">Sejarah Desa</h3>
              <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-wrap">
                {profil?.sejarah || 'Sejarah belum ditambahkan.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="card h-full">
                <h3 className="card-title text-center text-[#1e3a8a]">Visi Desa</h3>
                <p className="text-gray-700 text-center font-medium leading-relaxed italic text-lg">"{profil?.visi || 'Visi belum ditambahkan.'}"</p>
              </div>

              <div className="card h-full">
                <h3 className="card-title">Misi Desa</h3>
                <ul className="list-decimal pl-6 text-gray-600 space-y-3 leading-relaxed">
                  {misiArray.map((m: string, i: number) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
