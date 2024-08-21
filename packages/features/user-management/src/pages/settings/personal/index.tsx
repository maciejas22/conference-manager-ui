import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getUserQuery } from '#graphql/get-user';

import { UpdateUserForm } from './update-user-form';

export async function ModifyUserPage() {
  const user = await serverFetcher({ document: getUserQuery });

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
