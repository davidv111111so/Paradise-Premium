const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://epsbdyybofovzdgfxnir.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2JkeXlib2ZvdnpkZ2Z4bmlyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ3OTE3OSwiZXhwIjoyMDkwMDU1MTc5fQ.2qC5udPfXbAoei3dOhNBlB5wvsTJUJY_c4lNBCD81Zc'
);

async function init() {
  console.log('--- Initializing Supabase Custom Policies ---');
  
  const sql = `
    -- Add author_email if not exists
    ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS author_email TEXT;

    -- Drop existing restrictive policies if any
    DROP POLICY IF EXISTS "Properties: public read" ON public.properties;
    DROP POLICY IF EXISTS "Properties: agent/admin insert" ON public.properties;
    DROP POLICY IF EXISTS "Properties: owner update" ON public.properties;
    DROP POLICY IF EXISTS "Properties: owner delete" ON public.properties;
    DROP POLICY IF EXISTS "Management can update/delete" ON public.properties;

    -- Create modern permissive policies for the team
    CREATE POLICY "Allow All Select" ON public.properties FOR SELECT USING (true);
    CREATE POLICY "Allow All Insert" ON public.properties FOR INSERT WITH CHECK (true);
    CREATE POLICY "Allow All Update" ON public.properties FOR UPDATE USING (true);
    CREATE POLICY "Allow All Delete" ON public.properties FOR DELETE USING (true);

    -- Ensure RLS is enabled
    ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql });
  
  if (error) {
    console.error('Error applying policies:', error);
  } else {
    console.log('✅ ALL POLICIES UPDATED SUCCESSFULLY');
  }
}

init();
