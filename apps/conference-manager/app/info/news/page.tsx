import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNewsQueryOptions } from '@/services/info/queries';
import { NewsPage } from './_components/news-page';

export default async function News() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(getNewsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsPage />
    </HydrationBoundary>
  );
}
