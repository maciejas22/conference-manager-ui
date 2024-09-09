'use server';

import { cache } from 'react';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getNewsQuery } from '@/graphql/get-news';

export const getNews = cache(async () => {
  return await serverFetcher({ document: getNewsQuery }).catch(() => {
    throw new Error('Failed to fetch news');
  });
});
