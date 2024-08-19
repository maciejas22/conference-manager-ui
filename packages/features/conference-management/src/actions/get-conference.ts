'use server';

import { serverFetcher } from '@repo/shared/server-fetcher';

import { getConferenceQuery } from '#graphql/get-conference';

export const getConference = (id: string) => {
  return serverFetcher({
    document: getConferenceQuery,
    variables: { id },
  });
};
