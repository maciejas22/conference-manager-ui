'use server';

import { getGqlClient } from '@repo/shared/graphql-client';

import { getTermsOfServiceQuery } from '#graphql/get-terms-of-service';

export const getTermsOfService = () => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getTermsOfServiceQuery);
};
