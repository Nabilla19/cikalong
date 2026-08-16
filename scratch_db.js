const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://ufzirailnrxfnbqfwsmg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmemlyYWlsbnJ4Zm5icWZ3c21nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjE4MTQ2OSwiZXhwIjoyMTAxNzU3NDY5fQ.5Am4v3j9KaM_Wjxip44op3ahviLn2HZWo5jwMKRUmQY');
async function run() {
  const { data, error } = await supabase.from('geografi').select('*').limit(1);
  console.log(data, error);
}
run();
