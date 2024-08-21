'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getUserQuery } from '#graphql/get-user';

export const getUser = () => {
  return serverFetcher({
    document: getUserQuery,
  });
};
