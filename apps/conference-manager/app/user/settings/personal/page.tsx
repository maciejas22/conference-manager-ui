import { ModifyUserPage } from '@repo/user-management';

import { protectRoute } from '@/utils/protect-route';

export default async function UpdateUserPage() {
  await protectRoute();
  return <ModifyUserPage />;
}
