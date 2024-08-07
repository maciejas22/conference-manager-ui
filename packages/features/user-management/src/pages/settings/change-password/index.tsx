'use client';

import { useEffect } from 'react';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import { Header, SubmitButton } from '@repo/shared/components';
import { Input } from '@repo/shared/nextui';

import {
  changePasswordAction,
  type ChangePasswordFormState,
} from '#actions/change-password';

const initialState: ChangePasswordFormState = {
  errors: {},
};

export function ChangePasswordPage() {
  const [state, formAction] = useFormState(changePasswordAction, initialState);

  useEffect(() => {
    if (state.message?.text) {
      toast(state.message.text);
    }
  }, [state.message]);

  return (
    <>
      <Header>Update Password</Header>
      <form className="um-mt-6 um-space-y-6" action={formAction}>
        <Input
          name="currentPassword"
          label="Current Password"
          isRequired
          type="password"
          isInvalid={!!state.errors.currentPassword}
          errorMessage={state.errors.currentPassword}
        />
        <Input
          name="newPassword"
          label="New Password"
          isRequired
          type="password"
          isInvalid={!!state.errors.newPassword}
          errorMessage={state.errors.newPassword}
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          isRequired
          type="password"
          isInvalid={!!state.errors.confirmPassword}
          errorMessage={state.errors.confirmPassword}
        />
        <SubmitButton>Save</SubmitButton>
      </form>
    </>
  );
}
