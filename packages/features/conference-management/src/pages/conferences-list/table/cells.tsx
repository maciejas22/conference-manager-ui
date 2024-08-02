import { Icon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { Link, Tooltip } from '@repo/libs/nextui';
import { getFormattedDateTime } from '@repo/utils/date-formatter';

import { type GetConferencesQueryResponse } from '#services/get-conferences';

import { ColumnKey } from './columns';

interface CellProps {
  item: GetConferencesQueryResponse['data'][number];
  columnKey: ColumnKey;
}

function DefaultCell({ children }: { children: React.ReactNode }) {
  return (
    <span className="cm-whitespace-nowrap cm-overflow-hidden cm-text-ellipsis">
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
          <Link href={`/conference/${item.id}`} color="foreground">
            <Icon icon="el:eye-open" />
          </Link>
        </Tooltip>
      );
    default:
      return <DefaultCell>{item[columnKey] ?? 'N/A'}</DefaultCell>;
  }
}

export { Cell };
