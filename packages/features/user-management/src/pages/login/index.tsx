import { Link } from '@repo/libs/nextui';
import { Metadata } from 'next';

import { Header } from '@repo/components';

import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default function LoginPage() {
  return (
    <>
      <Header>Sign in to your account</Header>

      <LoginForm />

      <p className="prose mt-10 text-center">
        {"Don't have an account? "}
        <Link href="/auth/register" className="text-primary">
          Register
        </Link>
      </p>
    </>
  );
}
