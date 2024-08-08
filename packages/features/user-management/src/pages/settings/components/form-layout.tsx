import React from 'react';

import { Card, CardBody, CardHeader } from '@repo/shared/nextui';

interface FormLayoutProps {
  header: string;
  children: JSX.Element;
}

export function FormLayout({ header, children }: FormLayoutProps) {
  return (
    <Card className="um-p-2">
      <CardHeader className="um-text-2xl">{header}</CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
