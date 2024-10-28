import { ErrorPage } from '@/features/error/global-error-template';

export function StripeReturnPage() {
  return (
    <ErrorPage
      status="Success"
      header="Details Submitted"
      subHeader="That's everything we need for now"
      button={{ href: '/', text: 'Back to Homepage' }}
    />
  );
}
