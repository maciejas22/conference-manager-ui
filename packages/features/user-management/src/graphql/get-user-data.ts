import { graphql } from '@repo/shared/graphql';

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
