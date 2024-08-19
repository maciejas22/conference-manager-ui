'use server';

import { createClient } from '@repo/shared/supabase/server-client';

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
}
