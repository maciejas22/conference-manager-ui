'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getAgendaQuery } from '#graphql/get-agenda';

export const getAgenda = (id: string) => {
  return serverFetcher({
    document: getAgendaQuery,
    variables: { id },
  });
};
