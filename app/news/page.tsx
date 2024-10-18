import { type Metadata } from 'next';

import { z } from 'zod';

import { getNewsFragment, NewsList } from '@/features/info/news';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

export const metadata: Metadata = {
  title: 'News | Conference Manager',
};

const getNewsQuery = graphql(
  `
    query NewsPage($page: Page) {
      news(page: $page) {
        ...NewsFragment
      }
    }
  `,
  [getNewsFragment],
);

const paginationSchema = z.object({
  page: z
    .string()
    .transform((pageString) => Number(pageString))
    .catch(() => 1),
  pageSize: z
    .string()
    .transform((pageSizeString) => Number(pageSizeString))
    .catch(() => 10),
});

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const { page, pageSize } = paginationSchema.parse(searchParams);
  const newsData = await serverFetcher({
    document: getNewsQuery,
    variables: { page: { number: page, size: pageSize } },
  });

  return <NewsList data={newsData.news} />;
}
