import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Menggunakan Service Role Key yang baru saja ditambahkan untuk bypass RLS & Auth Rules
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// GET: Mengambil daftar semua admin
export async function GET() {
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) throw error;
    
    // Hanya mengirim data yang dibutuhkan (ID, email, created_at, last_sign_in_at)
    const adminList = users.map(user => ({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
    }));
    
    return NextResponse.json(adminList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE: Menghapus admin berdasarkan ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'Admin berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
