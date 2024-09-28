'use server';

import { cache } from 'react';

import { serverFetcher } from '@/utils/server-fetcher';

import { getConferencesQuery, GetConferencesQueryVariables } from './query';

export const getConferences = cache((input: GetConferencesQueryVariables) =>
  serverFetcher({
    document: getConferencesQuery,
    variables: input,
  }),
);
