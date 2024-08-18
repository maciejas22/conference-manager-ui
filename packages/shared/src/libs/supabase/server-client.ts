import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { keys } from './keys';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(keys.projectURL, keys.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
