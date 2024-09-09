import { type Metadata } from 'next';

import { getNews } from '@/actions/get-news';

import { News } from './news';

export const metadata: Metadata = {
  title: 'News | Conference Manager',
};

export default async function NewsPage() {
  const data = await getNews();

  return (
    <div className="space-y-8">
      {data.news.map((news) => (
        <News key={news.title} {...news} />
      ))}
    </div>
  );
}
