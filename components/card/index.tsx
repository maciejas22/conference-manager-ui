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
        <CardHeader className="text-2xl gap-2">{header}</CardHeader>
      ) : null}
      <CardBody className="space-y-4">{children}</CardBody>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </NextCard>
  );
}
