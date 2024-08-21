'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { isOrganizerQuery } from '#graphql/is-organizer';

export const isOrganizer = (id: string) =>
  serverFetcher({
    document: isOrganizerQuery,
    variables: { conferenceID: id },
  });
