import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@cikalong.desa.id',
    password: 'admin123',
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ 
    message: 'Admin user created successfully!', 
    email: 'admin@cikalong.desa.id',
    password: 'admin123' 
  });
}
