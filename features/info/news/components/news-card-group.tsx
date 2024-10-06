import { type ComponentProps } from 'react';

import { News } from './news-card';

type NewsCardGroupProps = {
  news: (ComponentProps<typeof News> & { id: number })[];
};

export function NewsCardGroup({ news }: NewsCardGroupProps) {
  return (
    <div className="space-y-8">
      {news.map((news) => (
        <News key={`${news.id}`} {...news} />
      ))}
    </div>
  );
}
