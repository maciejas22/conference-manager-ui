'use server';

import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getNewsQuery = graphql(`
  query GetNews {
    news {
      id
      title
      content
      date
    }
  }
`);

export const getNews = () =>
  serverFetcher({
    document: getNewsQuery,
  }).catch(() => {
    throw new Error('Failed to fetch news');
  });
