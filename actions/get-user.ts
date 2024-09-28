import { cache } from 'react';

import { getUserQuery } from '@/graphql/get-user';
import { serverFetcher } from '@/utils/server-fetcher';

export const getUser = cache(() => serverFetcher({ document: getUserQuery }));
