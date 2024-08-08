import React from 'react';

import { ChangePasswordPage } from '@repo/user-management';

import { protectRoute } from '@/utils/protect-route';

export default async function Page() {
  await protectRoute();
  return <ChangePasswordPage />;
}
