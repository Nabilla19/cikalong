import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const strukturData = [
    { jabatan: 'Kepala Desa Cikalong', nama: 'Ruspandi', urutan: 1 },
    { jabatan: 'Sekretaris Desa', nama: 'Kosmara', urutan: 2 },
    { jabatan: 'Kaur Perencanaan', nama: 'Etikah, A.Md', urutan: 3 },
    { jabatan: 'Kaur Keuangan', nama: 'Nolis Pitriani', urutan: 3 },
    { jabatan: 'Staf Keuangan', nama: 'Arif Firmansyah', urutan: 3 },
    { jabatan: 'Kaur Tata Usaha & Umum', nama: 'Sutarma Wiguna, S.Pd', urutan: 3 },
    { jabatan: 'Staf Umum', nama: 'Endi Mulyadi, S.Pd', urutan: 3 },
    { jabatan: 'Kepala Seksi Pelayanan', nama: 'Sukirman', urutan: 4 },
    { jabatan: 'Kepala Seksi Pemerintahan', nama: 'Nurdiana, S. Pd.Si', urutan: 4 },
    { jabatan: 'Kepala Seksi Kesejahteraan', nama: 'Kusnendar', urutan: 4 },
    { jabatan: 'Kepala Dusun Citembong', nama: 'Aris Kustandar', urutan: 5 },
    { jabatan: 'Kepala Dusun Cimanggu', nama: 'Didin Haridin', urutan: 5 },
    { jabatan: 'Kepala Dusun Cimanggu', nama: 'Heri', urutan: 5 },
  ];

  await supabase.from('struktur_organisasi').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  const { data, error } = await supabase.from('struktur_organisasi').insert(strukturData);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Seeded successfully' });
}
