import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vpaahuxhqodjbwxajsiq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwYWFodXhocW9kamJ3eGFqc2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwODk3NTYsImV4cCI6MjA5OTY2NTc1Nn0.JbxjtH8yJGT65TNZ4XR06SwnnJW1AL_9iaAy2V-nv1c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
