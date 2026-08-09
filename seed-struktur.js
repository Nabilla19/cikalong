const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

async function seedData() {
  console.log("Seeding struktur_organisasi...");
  // Clear existing first
  await supabase.from('struktur_organisasi').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // delete all
  
  const { data, error } = await supabase.from('struktur_organisasi').insert(strukturData);
  
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Success! Inserted", strukturData.length, "rows.");
  }
}

seedData();
