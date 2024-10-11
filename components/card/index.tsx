import { type ReactNode } from 'react';

import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextCard,
} from '@nextui-org/card';

type FormLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export function Card({ children, header, footer }: FormLayoutProps) {
  return (
    <NextCard className="p-2">
      {header ? (
        <CardHeader className="gap-2 text-2xl">{header}</CardHeader>
      ) : null}
      <CardBody className="space-y-4">{children}</CardBody>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </NextCard>
  );
}
