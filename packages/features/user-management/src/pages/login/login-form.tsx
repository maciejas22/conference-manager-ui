'use client';

import { Input } from '@nextui-org/input';
import { useFormState } from 'react-dom';

import { SubmitButton } from '@/components/submit-button';

import { login } from '@/actions/login';

const initialState = {
  errors: {
    email: [],
    password: [],
  },
  message: '',
};

function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form className="mt-10 space-y-6" action={formAction}>
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
