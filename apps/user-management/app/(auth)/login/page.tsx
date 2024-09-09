import type { Metadata } from 'next';

import { Header } from '@repo/shared/components';
import { Link } from '@repo/shared/nextui';

import { LoginForm } from './login-form';

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
