import { GraphQLClient, RequestMiddleware } from 'graphql-request';

import { createClient } from '#supabase/client';

export const requestMiddleware: RequestMiddleware = async (req) => {
  const headers = new Headers(req.headers);
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? '';

  headers.append('Authorization', `Bearer ${token}`);
  return {
    ...req,
    headers,
  };
};

const getGqlClient = () => {
  return new GraphQLClient(`${process.env.API_DOMAIN}/graphql`, {
    requestMiddleware,
    credentials: 'include',
  });
};

export { getGqlClient };
