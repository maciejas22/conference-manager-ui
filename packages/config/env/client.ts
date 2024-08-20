import { z } from 'zod';

const envClientSchema = z.object({
  NEXT_PUBLIC_UI_GQL_PROXY_URL: z.string(),
});

const envClient = envClientSchema.safeParse({
  NEXT_PUBLIC_UI_GQL_PROXY_URL: process.env.NEXT_PUBLIC_UI_GQL_PROXY_URL,
});

if (!envClient.success) {
  throw new Error('Invalid client environment variables');
}

export const env = envClient.data;
