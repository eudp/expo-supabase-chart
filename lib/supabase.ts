import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uykiijkuzdyqwaimukxt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5a2lpamt1emR5cXdhaW11a3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2Mjk3NjEsImV4cCI6MjA0MTIwNTc2MX0.-Yk9b2RP2HSaRDMXIRKqQSTpmQImLwI_rk-M3-L_nEo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
