import { getUser } from '#services/get-user-data';

import { FormLayout } from '../components/form-layout';
import { UpdateUserForm } from './update-user-form';

export async function ModifyUserPage() {
  const user = await getUser();

  const userData = user.user;
  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <FormLayout header="Update User">
      <UpdateUserForm
        name={userData.name ?? ''}
        surname={userData.surname ?? ''}
        username={userData.username ?? ''}
        email={userData.email}
      />
    </FormLayout>
  );
}
