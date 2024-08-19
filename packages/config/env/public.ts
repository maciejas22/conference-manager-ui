import { z } from 'zod';

const envPublicSchema = z.object({
  API_URL: z.string().url(),
  UI_URL: z.string().url(),
});

const envPublic = envPublicSchema.safeParse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  UI_URL: process.env.NEXT_PUBLIC_UI_URL,
});

if (!envPublic.success) {
  throw new Error('Invalid public environment variables');
}

export const env = envPublic.data;
