import { graphql } from '@repo/shared/graphql';

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
