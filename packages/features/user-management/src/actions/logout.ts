'use server';

import { createClient } from '@repo/libs/supabase/client';

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
}
