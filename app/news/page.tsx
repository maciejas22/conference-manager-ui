import { type Metadata } from 'next';

import { NewsList } from '@/features/info/news';

export const metadata: Metadata = {
  title: 'News | Conference Manager',
};

export default function NewsPage() {
  return <NewsList />;
}
