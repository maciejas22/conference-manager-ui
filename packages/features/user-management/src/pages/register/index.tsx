import { Link } from '@nextui-org/link';
import { Metadata } from 'next';

import { Header } from '@repo/components';
import { RegisterForm } from './singup-form';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <>
      <Header>Register for an account</Header>

      <RegisterForm />

      <p className="prose mt-10 text-center">
        {'Already a member? '}
        <Link href="/auth/login" className="text-primary">
          Sign in
        </Link>
      </p>
    </>
  );
}
