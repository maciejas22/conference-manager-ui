import { getGqlClient } from "@/lib/graphql-client";

import GET_NEWS from "@/graphql/GetNews";
import GET_TERMS from "@/graphql/GetTermsOfService";

async function getTerms() {
  const gqlClient = getGqlClient();
  return gqlClient?.request(GET_TERMS);
}

async function getNews() {
  const gqlClient = getGqlClient();
  return gqlClient?.request(GET_NEWS);
}

export { getTerms, getNews };
