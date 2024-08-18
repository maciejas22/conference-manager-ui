import { Icon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { Link, Tooltip } from '@repo/shared/nextui';
import { formatter } from '@repo/shared/utils';

import { type GetConferencesQueryResponse } from '#graphql/get-conferences';

import { ColumnKey } from './types/column';

type CellProps = {
  item: GetConferencesQueryResponse['data'][number];
  columnKey: ColumnKey;
};

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
            ? formatter.getFormattedDateTime(
                parseAbsoluteToLocal(item[columnKey]),
              )
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
