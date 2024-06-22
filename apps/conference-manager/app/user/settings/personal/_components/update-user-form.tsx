"use client";

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";

import { SubmitButton } from "@/components/submit-button";

import { updateUser, UpdateUserFormState } from "@/actions/user";

const initialState: UpdateUserFormState = {
  errors: {
    name: [],
    surname: [],
    username: [],
    email: [],
  },
  message: "",
};

interface Props {
  name: string;
  surname: string;
  username: string;
  email: string;
}

export default function UpdateUserForm({
  name,
  surname,
  username,
  email,
}: Props) {
  const [state, formAction] = useFormState(updateUser, initialState);

  return (
    <form className="mt-6 space-y-6" action={formAction}>
      <Input
        name="name"
        label="Name"
        defaultValue={name}
        isInvalid={state?.errors.name && state.errors.name?.length > 0}
        errorMessage={state?.errors.name}
      />
      <Input
        name="surname"
        label="Surname"
        defaultValue={surname}
        isInvalid={state?.errors.surname && state.errors.surname?.length > 0}
        errorMessage={state?.errors.surname}
      />
      <Input
        name="username"
        label="Username"
        isRequired
        defaultValue={username}
        isInvalid={state?.errors.username && state.errors.username?.length > 0}
        errorMessage={state?.errors.username}
      />
      <Input
        name="email"
        label="Email"
        isRequired
        defaultValue={email}
        type="email"
        isInvalid={state?.errors.email && state.errors.email?.length > 0}
        errorMessage={state?.errors.email}
      />
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}
