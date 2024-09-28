import { getNews } from './action';
import { News } from './components/news-card';

export const NewsList = async () => {
  const newsData = await getNews();
  if (!newsData) {
    return null;
  }

  return (
    <>
      {newsData.news.map((news) => (
        <News key={news.title} {...news} />
      ))}
    </>
  );
};
