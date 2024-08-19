import { getUser } from '../get-user';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export async function Navigation() {
  const userData = await getUser();

  if (!userData.user) {
    return null;
  }

  return (
    <>
      <Navbar user={userData.user} />
      <Sidebar />
    </>
  );
}
