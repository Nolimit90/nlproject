import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ruoxsedhghhhqmkgcykn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1b3hzZWRoZ2hoaHFta2djeWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTU2NjUsImV4cCI6MjA2NzYzMTY2NX0.4KjjRqEqREr0EwjxPKCMM6JqlY9V4CWZPCGi7x3kvSQ'
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 