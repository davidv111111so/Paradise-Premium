
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epsbdyybofovzdgfxnir.supabase.co';
const supabaseKey = 'sb_publishable_Kn2V3jMB9bwYS5cWizcpEQ_Tu6omuG4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*');
  
  if (error) {
    console.error('Error fetching properties:', error);
    return;
  }
  
  console.log('Number of properties in DB:', data.length);
  data.forEach(p => {
    console.log(`- ${p.id}: ${p.title} (${p.category})`);
  });
}

checkProperties();
