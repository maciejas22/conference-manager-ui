import { cache } from 'react';

import { graphql, ResultOf } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getUserQuery = graphql(`
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

export const getUser = cache(() => serverFetcher({ document: getUserQuery }));
export type User = ResultOf<typeof getUserQuery>['user'];
