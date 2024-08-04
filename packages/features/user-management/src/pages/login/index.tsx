import { Header } from '@repo/components';
import { Link } from '@repo/shared/nextui';

import { LoginForm } from './login-form';

export function LoginPage() {
  return (
    <>
      <Header>Sign in to your account</Header>

      <LoginForm />

      <p className="um-prose um-mt-10 um-text-center">
        {"Don't have an account? "}
        <Link href="/auth/register" className="um-text-primary">
          Register
        </Link>
      </p>
    </>
  );
}
