import type { Metadata } from 'next';

import { Header } from '@repo/shared/components';
import { Link } from '@repo/shared/nextui';

import { RegisterForm } from './singup-form';

export const metadata: Metadata = {
  title: 'Sign up | Conference Manager',
};

export default function RegisterPage() {
  return (
    <>
      <Header>Register for an account</Header>

      <RegisterForm />

      <p className="prose mt-10 text-center">
        {'Already a member? '}
        <Link href="/user/login" className="text-primary">
          Sign in
        </Link>
      </p>
    </>
  );
}
