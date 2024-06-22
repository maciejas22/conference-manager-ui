import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getConferencesQueryOptions } from "@/services/conference/queries";
import { ConferencesTable } from "./_components/table";
import { pageSizeOptions } from "./_options";
import { SearchParamsProvider } from "./_providers/search-params";
import { searchParamsSchema } from "./_providers/search-params/schema";

interface ConferenceListPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ConferenceListPage({
  searchParams,
}: ConferenceListPageProps) {
  const validatedSearchParams = searchParamsSchema.parse({
    page: parseInt(
      Array.isArray(searchParams.page)
        ? searchParams.page[0]
        : searchParams.page || "1",
    ),
    pageSize: parseInt(
      Array.isArray(searchParams.pageSize)
        ? searchParams.pageSize[0]
        : searchParams.pageSize || pageSizeOptions[0].toString(),
    ),
    sort: searchParams.sort,
    sortDirection: searchParams.sortDirection,
    associatedOnly: searchParams.associatedOnly === "true",
    title: searchParams.title,
  });

  const queryClient = new QueryClient();
  queryClient.prefetchQuery(
    getConferencesQueryOptions({
      filters: {
        sort: {
          column: validatedSearchParams.sort,
          order: validatedSearchParams.sortDirection,
        },
        associatedOnly: validatedSearchParams.associatedOnly,
        title: validatedSearchParams.title,
      },
      page: {
        number: validatedSearchParams.page,
        size: validatedSearchParams.pageSize,
      },
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchParamsProvider>
        <ConferencesTable />
      </SearchParamsProvider>
    </HydrationBoundary>
  );
}
