import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const getUserDataQuery = graphql(`
  query GetUser {
    user {
      id
      name
      surname
      username
      email
      role
    }
  }
`);

function getUser() {
  const gqlClient = getGqlClient();
  return gqlClient.request(getUserDataQuery);
}

export { getUser };
