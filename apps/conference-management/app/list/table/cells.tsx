import { Icon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { Link, Tooltip } from '@repo/shared/nextui';
import { getFormattedDateTime } from '@repo/shared/utils/formatters/date-formatter/index';

import { type GetConferencesQueryResponse } from '@/graphql/get-conferences';

import { ColumnKey } from './types/column';

type CellProps = {
  item: GetConferencesQueryResponse['data'][number];
  columnKey: ColumnKey;
};

function DefaultCell({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
      {children}
    </span>
  );
}

function Cell({ item, columnKey }: CellProps) {
  switch (columnKey) {
    case ColumnKey.StartDate:
    case ColumnKey.EndDate:
    case ColumnKey.RegistrationDeadline:
      return (
        <DefaultCell>
          {item[columnKey]
            ? getFormattedDateTime(parseAbsoluteToLocal(item[columnKey]))
            : 'N/A'}
        </DefaultCell>
      );
    case ColumnKey.Actions:
      return (
        <Tooltip content="Details">
          <Link href={`/${item.id}`} color="foreground">
            <Icon icon="el:eye-open" />
          </Link>
        </Tooltip>
      );
    default:
      return <DefaultCell>{item[columnKey] ?? 'N/A'}</DefaultCell>;
  }
}

export { Cell };
