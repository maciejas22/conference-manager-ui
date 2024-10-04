import type { Metadata } from 'next';

import { Link } from '@nextui-org/link';

import { Header } from '@/components/header';
import { LoginForm } from '@/features/user-management/login';

export const metadata: Metadata = {
  title: 'Login | Conference Manager',
};

export default function LoginPage() {
  return (
    <>
      <Header>Sign in to your account</Header>

      <LoginForm />

      <p className="prose mt-10 text-center">
        {"Don't have an account? "}
        <Link href="/user/sign-up" className="text-primary">
          Register
        </Link>
      </p>
    </>
  );
}
