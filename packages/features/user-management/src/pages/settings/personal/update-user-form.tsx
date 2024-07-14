'use client';

import { useEffect } from 'react';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import { SubmitButton } from '@repo/components';
import { Input } from '@repo/libs/nextui';

import {
  modifyUserDataAction,
  type ModifyUserDataFormState,
} from '#actions/modify-user-data';

const initialState: ModifyUserDataFormState = {
  errors: {},
};

interface UpdateUserFormProps {
  name: string;
  surname: string;
  username: string;
  email: string;
}

export function UpdateUserForm({
  name,
  surname,
  username,
  email,
}: UpdateUserFormProps) {
  const [state, formAction] = useFormState(modifyUserDataAction, initialState);

  useEffect(() => {
    if (state.message?.text) {
      toast(state.message.text);
    }
  }, [state.message]);

  return (
    <form className="um-mt-6 um-space-y-6" action={formAction}>
      <Input
        name="name"
        label="Name"
        defaultValue={name}
        isInvalid={!!state.errors.name}
        errorMessage={state.errors.name}
      />
      <Input
        name="surname"
        label="Surname"
        defaultValue={surname}
        isInvalid={!!state.errors.surname}
        errorMessage={state.errors.surname}
      />
      <Input
        name="username"
        label="Username"
        isRequired
        defaultValue={username}
        isInvalid={!!state.errors.username}
        errorMessage={state.errors.username}
      />
      <Input
        name="email"
        label="Email"
        isRequired
        defaultValue={email}
        type="email"
        isInvalid={!!state.errors.email}
        errorMessage={state.errors.email}
      />
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}
