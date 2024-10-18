'use client';

import { type ReactNode } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface CheckoutFormProps {
  children: ReactNode;
  clientSecret?: string;
}

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY ?? '');

export function StripeProvider({ children, clientSecret }: CheckoutFormProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          labels: 'floating',
          variables: {
            borderRadius: '12px',
            colorPrimary: '#006FEE',
            colorBackground: '#27272A',
            gridRowSpacing: '24px',
          },
          rules: {
            '.Input': {
              padding: '8px 12px',
              outline: 'none',
              shadow: 'none',
              boxShadow: 'none',
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
