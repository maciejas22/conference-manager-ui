'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getConferenceQuery } from '@/graphql/get-conference';

export const getConference = async (id: string) => {
  try {
    return await serverFetcher({
      document: getConferenceQuery,
      variables: { id },
    });
  } catch {
    throw new Error('Failed to fetch conference');
  }
};
