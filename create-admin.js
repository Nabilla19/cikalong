const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Anon Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  console.log("Creating admin user...");
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@cikalong.desa.id',
    password: 'admin123',
  });

  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("Admin user created successfully!");
    console.log("Email: admin@cikalong.desa.id");
    console.log("Password: admin123");
  }
}

createAdmin();
