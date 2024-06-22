"use client";

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";

import { SubmitButton } from "@/components/submit-button";

import { Role } from "@/graphql/__types__/types";

import { registerUser } from "@/actions/user";

const roles = [
  {
    value: Role.Participant,
    label: "Participant",
    description: "Join events",
  },
  {
    value: Role.Organizer,
    label: "Organizer",
    description: "Create and manage events",
  },
];

const initialState = {
  errors: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  },
  message: "",
};

function RegisterForm() {
  const [state, formAction] = useFormState(registerUser, initialState);

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

      <SubmitButton>Login</SubmitButton>
    </form>
  );
}

export { RegisterForm };
