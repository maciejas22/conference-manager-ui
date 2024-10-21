'use client';

import { type ReactNode } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';

interface CheckoutFormProps {
  children: ReactNode;
  options?: StripeElementsOptions;
}

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY ?? '');

export function StripeProvider({ children, options }: CheckoutFormProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
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
        ...options,
      }}
    >
      {children}
    </Elements>
  );
}
