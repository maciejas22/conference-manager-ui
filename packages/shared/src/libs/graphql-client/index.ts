import {
  GraphQLClient,
  type RequestInitExtended,
  type Variables,
} from 'graphql-request';

import { getSupabaseSession } from '#libs/supabase/actions.ts';

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
  new GraphQLClient('http://localhost:3000/api/graphql/', {
    requestMiddleware: (req) => requestMiddleware(req),
    fetch,
  });

export { getGqlClient };
