import { getNews } from '@/actions/get-news';

import { News } from './components/news';

export async function NewsPage() {
  const data = await getNews();

  return (
    <div className="info-space-y-8 info-my-8">
      {data.news.map((news) => (
        <News key={news.title} {...news} />
      ))}
    </div>
  );
}
