import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getTermsQueryOptions } from "@/services/info/queries";

import { TermsPage } from "./_components/terms";

export default async function Terms() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getTermsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TermsPage />
    </HydrationBoundary>
  );
}
