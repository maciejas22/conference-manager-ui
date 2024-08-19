import { z } from 'zod';

const envServerSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
});

const envServer = envServerSchema.safeParse(process.env);

if (!envServer.success) {
  throw new Error('Invalid server environment variables');
}

export const env = envServer.data;
