import { queryOptions } from "@tanstack/react-query";

import { getUser } from ".";

function getUserQueryOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
}

export { getUserQueryOptions };
