
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://epsbdyybofovzdgfxnir.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2JkeXlib2ZvdnpkZ2Z4bmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzkxNzksImV4cCI6MjA5MDA1NTE3OX0.9ccT2cuDd22dNgTXbhdPPZ6Rm3PwHu3FtuqtOE4G0cM'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testOperations() {
  console.log('--- FETCHING ONE PROPERTY ---')
  const { data: list } = await supabase.from('properties').select('*').limit(1)
  if (!list || list.length === 0) {
    fs.writeFileSync('test_error.txt', 'No properties to test on.')
    return
  }
  const prop = list[0]
  console.log('Testing on property:', prop.id, 'Title:', prop.title)

  console.log('--- TRYING UPDATE (CAMEL CASE) ---')
  const newPrice = Math.floor(Math.random() * 1000000)
  const { data: updateData, error: updateError } = await supabase
    .from('properties')
    .update({ price: newPrice, title: prop.title + ' (UPDATED)' })
    .eq('id', prop.id)
    .select()

  console.log('--- TRYING UPDATE (SNAKE CASE) ---')
  const { data: updateDataSnake, error: updateErrorSnake } = await supabase
    .from('properties')
    .update({ "isMock": true }) // testing if camelCase works
    .eq('id', prop.id)
    .select()

  let result = `Test on property: ${prop.id}\nOriginal Price: ${prop.price}\nNew Price Attempt: ${newPrice}\n`
  result += `Update Result (Price/Title): ${JSON.stringify(updateData)}\n`
  result += `Update Error (Price/Title): ${JSON.stringify(updateError)}\n`
  result += `Update Result (isMock): ${JSON.stringify(updateDataSnake)}\n`
  result += `Update Error (isMock): ${JSON.stringify(updateErrorSnake)}\n`

  fs.writeFileSync('test_error.txt', result)
}

testOperations()
