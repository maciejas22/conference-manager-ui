import { ChangePasswordPage } from '@repo/user-management';

import { protectRoute } from '@/utils/protect-route';

export default async function ChangePassword() {
  await protectRoute();
  return <ChangePasswordPage />;
}
