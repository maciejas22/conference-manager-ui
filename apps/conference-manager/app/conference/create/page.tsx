import { CreateConferencePage } from '@repo/conference-management';

import { protectRoute } from '@/utils/protect-route';

export default async function Page() {
  await protectRoute();
  return <CreateConferencePage />;
}
