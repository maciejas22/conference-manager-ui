import { z } from 'zod';

const publicEnvSchema = z.object({
  uiBaseUrl: z.string().url().default('http://localhost:3000'),
  apiBaseUrl: z.string().url().default('http://localhost:8080/graphql'),
  stripePublishableKey: z.string().default('pk_test_2137'),
});

export const publicEnv = publicEnvSchema.parse({
  uiBaseUrl: process.env.NEXT_PUBLIC_UI_URL,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});
