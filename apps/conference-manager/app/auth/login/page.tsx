import { type Metadata } from 'next';

import { LoginPage } from '@repo/user-management';

export const metadata: Metadata = {
  title: 'Login',
};
export default function Login() {
  return <LoginPage />;
}
