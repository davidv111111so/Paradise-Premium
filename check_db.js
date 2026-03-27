
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epsbdyybofovzdgfxnir.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2JkeXlib2ZvdnpkZ2Z4bmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzkxNzksImV4cCI6MjA5MDA1NTE3OX0.9ccT2cuDd22dNgTXbhdPPZ6Rm3PwHu3FtuqtOE4G0cM'
const supabase = createClient(supabaseUrl, supabaseKey)

import fs from 'fs'

async function check() {
  const { data: properties, error: prError } = await supabase.from('properties').select('id, title, category, created_at').order('created_at', { ascending: false })
  if (prError) {
    fs.writeFileSync('result_final.txt', 'Error: ' + JSON.stringify(prError))
    return
  }
  let out = `Total: ${properties.length}\n`
  for (const p of properties) {
    out += `${p.id} | ${p.title} | ${p.category} | ${p.created_at}\n`
  }
  fs.writeFileSync('result_final.txt', out)
}

check()
