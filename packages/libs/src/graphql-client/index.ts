import { createClient } from "@repo/libs/supabase/client";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

export const requestMiddleware: RequestMiddleware = async (req) => {
  const headers = new Headers(req.headers);
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? "";

  headers.append("Authorization", `Bearer ${token}`);
  return {
    ...req,
    headers,
  };
};

const getGqlClient = () => {
  return new GraphQLClient("http://localhost:8080/graphql", {
    requestMiddleware,
    credentials: "include",
  });
};

export { getGqlClient };
