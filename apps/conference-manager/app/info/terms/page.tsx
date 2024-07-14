import { TermsPage } from '@repo/info';

import { protectRoute } from '@/utils/protect-route';

export default async function ToS() {
  await protectRoute();

  return <TermsPage />;
}
