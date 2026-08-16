import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.from('geografi').upsert({
    id: 1,
    letak_dan_luas: 'tes',
    kondisi_tanah: [],
    kependudukan: [],
    mata_pencaharian: [],
    tingkat_pendidikan: [],
    sarana_prasarana: {}
  });

  return NextResponse.json({ data, error });
}
