'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@repo/libs/nextui';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="um-mt-2"
      type="submit"
      color="primary"
      fullWidth
      isLoading={pending}
    >
      <>{children}</>
    </Button>
  );
}

export { SubmitButton };
