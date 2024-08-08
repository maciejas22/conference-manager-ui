import React from 'react';

import { ModifyUserPage } from '@repo/user-management';

import { protectRoute } from '@/utils/protect-route';

export default async function Page() {
  await protectRoute();
  return <ModifyUserPage />;
}
