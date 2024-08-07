'use client';

import { useEffect } from 'react';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import { SubmitButton } from '@repo/shared/components';
import { Input, Radio, RadioGroup } from '@repo/shared/nextui';

import { signup, type SignupFormState } from '#actions/signup';
import { type Role } from '#types/role';

interface RoleOption {
  value: Role;
  label: string;
  description: string;
}

const roles: RoleOption[] = [
  {
    value: 'Participant',
    label: 'Participant',
    description: 'Join events',
  },
  {
    value: 'Organizer',
    label: 'Organizer',
    description: 'Create and manage events',
  },
];

const initialState: SignupFormState = {
  errors: {},
};

function RegisterForm() {
  const [state, formAction] = useFormState(signup, initialState);

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
      <Input
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        isRequired
        isInvalid={!!state.errors.confirmPassword}
        errorMessage={state.errors.confirmPassword}
      />
      <RadioGroup
        name="role"
        label="Role"
        color="primary"
        isRequired
        isInvalid={!!state.errors.role}
        errorMessage={state.errors.role}
      >
        {roles.map((role) => (
          <Radio
            key={role.value}
            value={role.value}
            description={role.description}
          >
            {role.label}
          </Radio>
        ))}
      </RadioGroup>

      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
}

export { RegisterForm };
