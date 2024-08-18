'use server';

import { serverFetcher } from '@repo/shared/server-fetcher';

import { getUserQuery } from '#graphql/get-user';

export const getUser = () => {
  return serverFetcher({
    document: getUserQuery,
  });
};
