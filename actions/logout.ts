'use server';

import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const logoutUserMutation = graphql(`
  mutation LogoutUser {
    logout
  }
`);

export const logoutUser = () => serverFetcher({ document: logoutUserMutation });
