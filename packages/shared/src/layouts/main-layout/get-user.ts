import { graphql, type ResultOf } from '#libs/graphql/graphql.ts';
import { serverFetcher } from '#utils/fetchers/server-fetcher.ts';

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

export const getUser = () => serverFetcher({ document: getUserQuery });
