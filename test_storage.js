
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://epsbdyybofovzdgfxnir.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2JkeXlib2ZvdnpkZ2Z4bmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzkxNzksImV4cCI6MjA5MDA1NTE3OX0.9ccT2cuDd22dNgTXbhdPPZ6Rm3PwHu3FtuqtOE4G0cM'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testStorage() {
  const { data, error } = await supabase.storage.listBuckets()
  if (error) {
    fs.writeFileSync('storage_test.txt', 'Error listing buckets: ' + error.message)
  } else {
    fs.writeFileSync('storage_test.txt', 'Buckets: ' + data.map(b => b.name).join(', '))
  }
}

testStorage()
