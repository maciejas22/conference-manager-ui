import { getGqlClient } from '@repo/libs/graphql-client';

import { getUserDataQuery } from '../graphql/get-user-data';

function getUser() {
  const gqlClient = getGqlClient();
  return gqlClient.request(getUserDataQuery);
}

export { getUser };
