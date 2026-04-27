
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://ajbueutcycdrxtnmudeo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhc2UiLCJyZWYiOiJajYnVldXRjeWNkcnh0bm11ZGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMDQyNTYsImV4cCI6MjA3NDU4MDI1Nn0.x92sXm2lkAw3tgspijkt5Ir9c_dbuoOInSfycXO7sAE'
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  console.log('Checking ajbueutcycdrxtnmudeo...')
  const { data, error } = await supabase.from('properties').select('*')
  if (error) {
    console.error('Error fetching properties:', error)
    fs.writeFileSync('check_ajb.txt', 'Error: ' + JSON.stringify(error))
  } else {
    console.log('Properties count:', data.length)
    fs.writeFileSync('check_ajb.txt', 'Count: ' + data.length + '\nData: ' + JSON.stringify(data.slice(0, 2), null, 2))
  }
}

check()
