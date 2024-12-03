import { cache } from 'react';

import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getStripeAccountQuery = graphql(`
  query GetStripeAccount {
    user {
      stripeAccountDetails {
        id
        isVerified
      }
    }
  }
`);

export const getStripeAccountDetails = cache(async () =>
  serverFetcher({ document: getStripeAccountQuery }),
);
