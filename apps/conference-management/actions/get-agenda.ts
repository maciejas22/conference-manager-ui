'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getAgendaQuery } from '@/graphql/get-agenda';

export const getAgenda = async (id: string) => {
  return await serverFetcher({
    document: getAgendaQuery,
    variables: { id },
  }).catch(() => {
    throw new Error('Failed to fetch agenda');
  });
};
