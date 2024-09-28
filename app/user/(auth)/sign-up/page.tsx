import type { Metadata } from 'next';

import { Link } from '@nextui-org/link';

import { Header } from '@/components';
import { RegisterForm } from '@/features/user-management/sing-up';

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
