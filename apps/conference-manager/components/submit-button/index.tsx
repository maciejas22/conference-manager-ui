"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/button";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-2"
      type="submit"
      color="primary"
      fullWidth
      isLoading={pending}
    >
      {children}
    </Button>
  );
}

export { SubmitButton };
