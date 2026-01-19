//D:\Smar\SMAR_LP\smar\lib\supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Khởi tạo client dùng chung cho toàn bộ ứng dụng
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

