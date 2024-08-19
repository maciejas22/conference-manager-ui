'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '#libs/nextui/index.ts';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="comps-mt-2"
      type="submit"
      color="primary"
      isLoading={pending}
    >
      <>{children}</>
    </Button>
  );
}

export { SubmitButton };
