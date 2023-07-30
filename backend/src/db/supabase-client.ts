import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://eetktpedykslzoohqeog.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldGt0cGVkeWtzbHpvb2hxZW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMjEzMzMsImV4cCI6MjAwNTU5NzMzM30.gXy473aapMvgfAsULExYMVcfAD02TEuLsf3PBbjblOQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;