import { NewsPage } from '@repo/info';

import { protectRoute } from '@/utils/protect-route';

export default async function News() {
  await protectRoute();

  return <NewsPage />;
}
