'use server';

import { cache } from 'react';

import { serverFetcher } from '@/utils/fetchers/server-fetcher';

import { getConferencesQuery, GetConferencesQueryVariables } from './query';

export const getConferences = cache(
  async (input: GetConferencesQueryVariables) =>
    serverFetcher({
      document: getConferencesQuery,
      variables: input,
    }),
);
