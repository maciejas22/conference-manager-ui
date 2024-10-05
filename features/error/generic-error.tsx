import { Icon } from '@iconify/react/dist/iconify.js';

import { Header } from '@/components/header';
import { Paper } from '@/components/paper';
import { SubHeader } from '@/components/sub-header';

type GenericErrorProps = {
  header: string;
  message: string;
};

export function GenericError({ header, message }: GenericErrorProps) {
  return (
    <Paper className="flex-row items-center gap-4">
      <Icon icon="ri:error-warning-line" className="text-7xl" />
      <div>
        <Header className="text-2xl my-3">{header}</Header>
        <SubHeader className="text-lg my-2">{message}</SubHeader>
      </div>
    </Paper>
  );
}
