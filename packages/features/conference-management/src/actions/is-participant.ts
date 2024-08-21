'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { isParticipantQuery } from '#graphql/is-participant';

export const isParticipant = (id: string) =>
  serverFetcher({
    document: isParticipantQuery,
    variables: { conferenceID: id },
  });
