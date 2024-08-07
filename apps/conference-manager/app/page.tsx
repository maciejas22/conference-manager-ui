import { HomePage } from '@repo/info';

import { protectRoute } from '@/utils/protect-route';

export default async function Page() {
  await protectRoute();
  return <HomePage />;
}
