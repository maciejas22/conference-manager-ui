import { Header } from '@repo/shared/components';
import { Link } from '@repo/shared/nextui';

import { RegisterForm } from './singup-form';

export function RegisterPage() {
  return (
    <>
      <Header>Register for an account</Header>

      <RegisterForm />

      <p className="um-prose um-mt-10 um-text-center">
        {'Already a member? '}
        <Link href="/auth/login" className="um-text-primary">
          Sign in
        </Link>
      </p>
    </>
  );
}
