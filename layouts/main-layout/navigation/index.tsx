import { type User } from '@/graphql/get-user';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

type NavigationProps = {
  user?: User | null;
};

export async function Navigation({ user }: NavigationProps) {
  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar user={user} />
      <Sidebar userRole={user.role} />
    </>
  );
}
