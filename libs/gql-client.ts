import { cookies } from 'next/headers';

import {
  GraphQLClient,
  type RequestInitExtended,
  type Variables,
} from 'graphql-request';

export const requestMiddleware = <V extends Variables = Variables>(
  req: RequestInitExtended<V>,
) => {
  const token = cookies().get('session')?.value ?? '';

  const headers = new Headers(req.headers);
  headers.set('Authorization', `Bearer ${token}`);
  req.headers = headers;
  return req;
};

const getGqlClient = (url: string) =>
  new GraphQLClient(url, {
    requestMiddleware,
    fetch,
  });

export { getGqlClient };
