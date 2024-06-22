import { getSession } from '@/actions/session';
import { GraphQLClient, type RequestMiddleware } from 'graphql-request';

const requestMiddleware: RequestMiddleware = async (req) => {
  const headers = new Headers(req.headers);

  const token = await getSession();
  headers.append('Authorization', `Bearer ${token}`);

  return {
    ...req,
    headers,
  };
};

const getGqlClient = () => {
  return new GraphQLClient('http://localhost:8080/graphql', {
    requestMiddleware,
    fetch,
    credentials: 'include',
  });
};

export { getGqlClient };
