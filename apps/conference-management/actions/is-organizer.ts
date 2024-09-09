'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { isOrganizerQuery } from '@/graphql/is-organizer';

export const isOrganizer = async (id: string) => {
  return await serverFetcher({
    document: isOrganizerQuery,
    variables: { conferenceID: id },
  }).catch(() => {
    throw new Error('Failed to check if user is organizer');
  });
};
