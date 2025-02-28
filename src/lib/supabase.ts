import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idmbwwnnitnlelykyvqn.supabase.co'; // Заміни на свій URL із Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWJ3d25uaXRubGVseWt5dnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzU1OTgsImV4cCI6MjA1NjM1MTU5OH0.TfYCY-tWuoISZj_eKpci2-y8j83iAnwZ9QvmABm1-VM'; // Заміни на свій ключ із Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};