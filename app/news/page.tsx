import { type Metadata } from 'next';

import { getNewsFragment, NewsList } from '@/features/info/news';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

export const metadata: Metadata = {
  title: 'News | Conference Manager',
};

const getNewsQuery = graphql(
  `
    query GetNews {
      news {
        ...NewsFragment
      }
    }
  `,
  [getNewsFragment],
);

export default async function NewsPage() {
  const newsData = await serverFetcher({ document: getNewsQuery });
  return <NewsList data={newsData.news} />;
}
