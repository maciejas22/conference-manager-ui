'use client';

import { useEffect } from 'react';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import { SubmitButton } from '@repo/components';
import { Input } from '@repo/libs/nextui';

import { login, type LoginFormState } from '#actions/login';

const initialState: LoginFormState = {
  errors: {},
};

console.log(login);

function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    if (state.message?.text) {
      toast(state.message.text);
    }
  }, [state.message]);

  return (
    <form className="um-mt-10 um-space-y-6" action={formAction}>
      <Input
        name="email"
        type="email"
        label="Email"
        isRequired
        isInvalid={!!state.errors.email}
        errorMessage={state.errors.email}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        isRequired
        isInvalid={!!state.errors.password}
        errorMessage={state.errors.password}
      />
      <SubmitButton>Login</SubmitButton>
    </form>
  );
}

export { LoginForm };
