import { graphql } from '@repo/libs/graphql';

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
