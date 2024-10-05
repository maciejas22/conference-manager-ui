'use client';

import { ErrorPage } from '@/features/error/global-error-template';

export default function GlobalErrorPage() {
  return (
    <ErrorPage
      status="500"
      header="Oops! Something went wrong."
      subHeader="We encountered an error while processing your request. Please try again later."
      button={{ href: '/', text: 'Back to Homepage' }}
    />
  );
}
