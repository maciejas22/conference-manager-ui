'use client';

import { Button } from '@nextui-org/button';
import React from 'react';
import { useFormStatus } from 'react-dom';

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
