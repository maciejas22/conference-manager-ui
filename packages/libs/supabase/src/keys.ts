import { z } from 'zod';

const keysSchema = z.object({
  projectURL: z.string().url().catch('http://localhost:3000'),
  anonKey: z.string().catch('anonKey'),
});

const keys = keysSchema.parse({
  projectURL: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY,
});

export { keys };
