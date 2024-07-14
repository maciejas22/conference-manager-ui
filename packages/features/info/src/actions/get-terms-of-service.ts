'use server';

import { getGqlClient } from '@repo/libs/graphql-client';

import { getTermsOfServiceQuery } from '@/graphql/get-terms-of-service';

export const getTermsOfService = () => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getTermsOfServiceQuery);
};
