'use client';

import { GenericError } from '@/features/error/generic-error';

export default function Error() {
  return (
    <GenericError
      header="Unexpected error"
      message="Could not load agenda. Please try again later."
    />
  );
}
