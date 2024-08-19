'use server';

import { serverFetcher } from '@repo/shared/server-fetcher';

import { getAgendaQuery } from '#graphql/get-agenda';

export const getAgenda = (id: string) => {
  return serverFetcher({
    document: getAgendaQuery,
    variables: { id },
  });
};
