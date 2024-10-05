import { ErrorPage } from '@/features/error/global-error-template';

export default function NotFoundPage() {
  return (
    <ErrorPage
      status="404"
      header="Oops! Page not found."
      subHeader="We're sorry, but the page you are looking for doesn't exist."
      button={{ href: '/', text: 'Back to Homepage' }}
    />
  );
}
