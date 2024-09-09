'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { isParticipantQuery } from '@/graphql/is-participant';

export const isParticipant = async (id: string) => {
  return await serverFetcher({
    document: isParticipantQuery,
    variables: { conferenceID: id },
  }).catch(() => {
    throw new Error('Failed to check if user is participant');
  });
};
