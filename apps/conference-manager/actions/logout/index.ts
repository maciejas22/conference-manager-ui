'use server';

import { logout as logoutUser } from '@repo/user-management';

export async function logout() {
  await logoutUser();
}
