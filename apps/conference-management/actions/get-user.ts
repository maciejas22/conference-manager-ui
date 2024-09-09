'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getUserQuery } from '@/graphql/get-user';

export const getUser = async () => {
  return await serverFetcher({
    document: getUserQuery,
  }).catch(() => {
    throw new Error('Failed to fetch user');
  });
};
