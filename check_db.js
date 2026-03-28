
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epsbdyybofovzdgfxnir.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2JkeXlib2ZvdnpkZ2Z4bmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzkxNzksImV4cCI6MjA5MDA1NTE3OX0.9ccT2cuDd22dNgTXbhdPPZ6Rm3PwHu3FtuqtOE4G0cM'
const supabase = createClient(supabaseUrl, supabaseKey)

import fs from 'fs'

async function check() {
  const { data: properties, error: prError } = await supabase.from('properties').select('*').limit(1)
  if (prError) {
    fs.writeFileSync('result_final.txt', 'Error: ' + JSON.stringify(prError))
    return
  }
  if (properties && properties[0]) {
    fs.writeFileSync('result_final.txt', 'Columns: ' + Object.keys(properties[0]).join(', '))
  } else {
    fs.writeFileSync('result_final.txt', 'No data found.')
  }
}

check()
