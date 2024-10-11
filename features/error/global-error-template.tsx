'use client';

import Link from 'next/link';

import { Button } from '@nextui-org/button';

import { Header } from '@/components/header';
import { SubHeader } from '@/components/sub-header';

type ErrorPageProps = {
  status: string;
  header: string;
  subHeader: string;
  button?: {
    href: string;
    text: string;
  };
};

export function ErrorPage({
  status,
  header,
  subHeader,
  button,
}: ErrorPageProps) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            {status}
          </h1>
          <Header>{header}</Header>
          <SubHeader>{subHeader}</SubHeader>
          <Button
            as={Link}
            href={button?.href ?? '/'}
            color="primary"
            className="my-8"
          >
            {button?.text ?? 'Back to Homepage'}
          </Button>
        </div>
      </div>
    </section>
  );
}
