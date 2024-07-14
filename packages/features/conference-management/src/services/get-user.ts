import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

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
