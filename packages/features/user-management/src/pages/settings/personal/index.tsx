import { Header } from '@repo/components';

import { getUser } from '@/services/get-user-data';

import { UpdateUserForm } from './update-user-form';

export async function ModifyUserPage() {
  const user = await getUser();

  const userData = user.user;
  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Header>Update User</Header>
      <UpdateUserForm
        name={userData.name ?? ''}
        surname={userData.surname ?? ''}
        username={userData.username ?? ''}
        email={userData.email}
      />
    </div>
  );
}
