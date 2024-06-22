"use client";

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";

import { Header } from "@/components/header";
import { SubmitButton } from "@/components/submit-button";

import { UpdatePasswordFormState, updateUserPassword } from "@/actions/user";

const initialState: UpdatePasswordFormState = {
  errors: {
    currentPassword: [],
    newPassword: [],
    confirmPassword: [],
  },
  message: "",
};

export default function UpdatePasswordForm() {
  const [state, formAction] = useFormState(updateUserPassword, initialState);

  return (
    <>
      <Header>Update Password</Header>
      <form className="mt-6 space-y-6" action={formAction}>
        <Input
          name="currentPassword"
          label="Current Password"
          isRequired
          type="password"
          isInvalid={
            state?.errors.currentPassword &&
            state.errors.currentPassword?.length > 0
          }
          errorMessage={state?.errors.currentPassword}
        />
        <Input
          name="newPassword"
          label="New Password"
          isRequired
          type="password"
          isInvalid={
            state?.errors.newPassword && state.errors.newPassword?.length > 0
          }
          errorMessage={state?.errors.newPassword}
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          isRequired
          type="password"
          isInvalid={
            state?.errors.confirmPassword &&
            state.errors.confirmPassword?.length > 0
          }
          errorMessage={state?.errors.confirmPassword}
        />
        <SubmitButton>Save</SubmitButton>
      </form>
    </>
  );
}
