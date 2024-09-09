'use server';

import { cache } from 'react';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getTermsOfServiceQuery } from '@/graphql/get-terms-of-service';

export const getTermsOfService = cache(async () => {
  return await serverFetcher({ document: getTermsOfServiceQuery }).catch(() => {
    throw new Error('Failed to fetch terms of service');
  });
});
