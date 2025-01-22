import {
  GraphQLClient,
  type RequestInitExtended,
  type Variables,
} from 'graphql-request';

export const requestMiddleware = <V extends Variables = Variables>(
  req: RequestInitExtended<V>,
  headers: Headers,
) => {
  const reqHeaders = new Headers(req.headers);
  headers.forEach((value, key) => {
    reqHeaders.set(key, value);
  });
  req.headers = reqHeaders;
  return req;
};

const getGqlClient = (url: string, headers: Headers) =>
  new GraphQLClient(url, {
    requestMiddleware: (req) => requestMiddleware(req, headers),
    fetch,
  });

export { getGqlClient };
