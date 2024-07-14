'use server';

import { getGqlClient } from '@repo/libs/graphql-client';

import { getNewsQuery } from '@/graphql/get-news';

export const getNews = () => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getNewsQuery);
};
