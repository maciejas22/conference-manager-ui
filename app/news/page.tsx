import { type Metadata } from 'next';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getNewsQueryOptions, NewsList } from '@/features/info/news';

export const metadata: Metadata = {
  title: 'News | Conference Manager',
};

export default async function NewsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getNewsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsList />
    </HydrationBoundary>
  );
}
