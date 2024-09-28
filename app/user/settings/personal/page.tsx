import type { Metadata } from 'next';

import { getUser } from '@/actions/get-user';
import { UpdateUserForm } from '@/features/user-management/settings';

export const metadata: Metadata = {
  title: 'Modify Account Details | Conference Manager',
};

export default async function ModifyUserPage() {
  const user = await getUser();

  const userData = user.user;
  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <UpdateUserForm
      name={userData.name ?? ''}
      surname={userData.surname ?? ''}
      username={userData.username ?? ''}
      email={userData.email}
    />
  );
}
