import { graphql, type ResultOf } from '@/libs/graphql';

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

export type User = ResultOf<typeof getUserQuery>['user'];
export type UserRole = ReturnType<typeof graphql.scalar<'Role'>>;
