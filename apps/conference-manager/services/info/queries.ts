import { queryOptions } from "@tanstack/react-query";

import { getNews, getTerms } from ".";

function getNewsQueryOptions() {
  return queryOptions({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });
}

function getTermsQueryOptions() {
  return queryOptions({
    queryKey: ["terms"],
    queryFn: () => getTerms(),
  });
}

export { getNewsQueryOptions, getTermsQueryOptions };
