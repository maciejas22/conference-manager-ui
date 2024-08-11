import { type Metadata } from 'next';

import { RegisterPage } from '@repo/user-management';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return <RegisterPage />;
}
