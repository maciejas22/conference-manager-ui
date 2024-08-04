'use server';

import { getGqlClient } from '@repo/shared/graphql-client';

import { getNewsQuery } from '#graphql/get-news';

export const getNews = () => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getNewsQuery);
};
