import { GraphQLClient } from "graphql-request";

const getGqlClient = () => {
  return new GraphQLClient("http://localhost:8080/graphql", {
    credentials: "include",
  });
};

export { getGqlClient };
