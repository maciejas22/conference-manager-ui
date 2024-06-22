import { graphql } from '@/lib/graphql';

export default graphql(`
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
