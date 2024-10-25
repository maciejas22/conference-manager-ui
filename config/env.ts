import { z } from 'zod';

const publicEnvSchema = z.object({
  uiBaseUrl: z.string().url(),
  apiBaseUrl: z.string().url(),
  stripePublishableKey: z.string(),
});

export const publicEnv = publicEnvSchema.parse({
  uiBaseUrl: process.env.NEXT_PUBLIC_UI_URL,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});
