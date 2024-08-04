import { cookies } from 'next/headers';

import { createServerClient, type CookieOptions } from '@supabase/ssr';

import { keys } from './keys';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(keys.projectURL, keys.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          console.error('error setting cookie: ', error);
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch (error) {
          console.error('error removing cookie: ', error);
        }
      },
    },
  });
}
