
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://nhulnikqfphofqpnmdba.supabase.co';
const supabaseKey = 'sb_publishable_fZLPEJsZFf_lixuf_8y-fg_anz-k5wr';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Checking nhulnikqfphofqpnmdba for properties...');
  const { data, error } = await supabase.from('properties').select('*');
  if (error) {
    console.error('Error:', error);
    fs.writeFileSync('check_nhul.txt', 'Error: ' + JSON.stringify(error));
  } else {
    console.log('Count:', data.length);
    fs.writeFileSync('check_nhul.txt', 'Count: ' + data.length + '\nData: ' + JSON.stringify(data.slice(0, 5), null, 2));
  }
}

check();
