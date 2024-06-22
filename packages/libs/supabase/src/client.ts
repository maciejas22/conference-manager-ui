import { createBrowserClient } from '@supabase/ssr';
import { keys } from './keys';

export function createClient() {
  return createBrowserClient(keys.projectURL, keys.anonKey);
}
