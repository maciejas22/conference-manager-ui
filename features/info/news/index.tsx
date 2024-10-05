import { FragmentOf, readFragment } from '@/libs/graphql';

import { News } from './components/news-card';
import { getNewsFragment } from './get-news-fragment';

type News = {
  data: FragmentOf<typeof getNewsFragment>[];
};

export const NewsList = async ({ data }: News) => {
  const newsData = readFragment(getNewsFragment, data);

  return (
    <>
      {newsData.map((news) => (
        <News key={news.title} {...news} />
      ))}
    </>
  );
};

export { getNewsFragment };
