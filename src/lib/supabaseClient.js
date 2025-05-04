import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // từ Project Settings > API
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY // từ Project Settings > API

export const supabase = createClient(supabaseUrl, supabaseKey)
