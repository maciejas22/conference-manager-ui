import {
  GraphQLClient,
  type RequestInitExtended,
  type Variables,
} from 'graphql-request';

import { env } from '@repo/config/env/public';

import { getSupabaseSession } from '#libs/supabase/actions.ts';

const apiUrl = new URL('/api/graphql', env.UI_URL);

export const requestMiddleware = async <V extends Variables = Variables>(
  req: RequestInitExtended<V>,
) => {
  const session = await getSupabaseSession();
  const token = session.data.session?.access_token ?? '';

  const headers = new Headers(req.headers);
  headers.set('Authorization', `Bearer ${token}`);
  req.headers = headers;
  return req;
};

const getGqlClient = () =>
  new GraphQLClient(apiUrl.toString(), {
    requestMiddleware: (req) => requestMiddleware(req),
    fetch,
  });

export { getGqlClient };
