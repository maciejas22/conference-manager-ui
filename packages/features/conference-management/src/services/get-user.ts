import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const getUserQuery = graphql(`
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

export const getUser = () => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getUserQuery);
};
