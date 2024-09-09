import { graphql } from '@repo/shared/graphql';

export const getUserQuery = graphql(`
  query GetUser {
    user {
      name
      surname
      username
      email
    }
  }
`);
