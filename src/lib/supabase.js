// --------------------------------------------------------
// Supabase Client — singleton, initialized from env vars
// --------------------------------------------------------
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epsbdyybofovzdgfxnir.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2JkeXlib2ZvdnpkZ2Z4bmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzkxNzksImV4cCI6MjA5MDA1NTE3OX0.9ccT2cuDd22dNgTXbhdPPZ6Rm3PwHu3FtuqtOE4G0cM';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
