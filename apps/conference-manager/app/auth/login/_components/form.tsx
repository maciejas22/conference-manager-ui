"use client";

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";

import { SubmitButton } from "@/components/submit-button";

import { loginUser } from "@/actions/user";

const initialState = {
  errors: {
    username: "",
    password: "",
  },
  message: "",
};

function LoginForm() {
  const [state, formAction] = useFormState(loginUser, initialState);

  return (
    <form className="mt-10 space-y-6" action={formAction}>
      <Input
        name="username"
        label="Username"
        isRequired
        isInvalid={!!state.errors.username}
        errorMessage={state.errors.username}
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
