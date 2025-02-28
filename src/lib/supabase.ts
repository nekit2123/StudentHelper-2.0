import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idmbwwnnitnlelykyvqn.supabase.co'; // Заміни на свій URL із Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWJ3d25uaXRubGVseWt5dnFuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDc3NTU5OCwiZXhwIjoyMDU2MzUxNTk4fQ.xdGsLi9dx8i9laqNsvUSv2PvczDvKCPCxbS7FoilOQE'; // Заміни на свій ключ із Supabase
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