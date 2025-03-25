import { createClient } from "@supabase/supabase-js";

// Use default demo URLs if environment variables are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://xyzcompany.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZGt6YXBwc2N5dHRyYnRxaWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NjY5NzcsImV4cCI6MjAxNTU0Mjk3N30.demo-key-not-real";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
