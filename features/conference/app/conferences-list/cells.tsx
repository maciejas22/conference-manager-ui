import { Icon } from '@iconify/react';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Link } from '@nextui-org/link';
import { Tooltip } from '@nextui-org/tooltip';

import { getFormattedDateTime } from '@/utils/formatters/date-formatter';

import { GetConferencesQueryResponse } from './actions/query';
import { ColumnKey } from './types/column';

type CellProps = {
  item: GetConferencesQueryResponse['data'][number];
  columnKey: ColumnKey;
};

function DefaultCell({ children }: { children: React.ReactNode }) {
  return (
    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
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
          <Link href={`/conference/${item.id.toString()}`} color="foreground">
            <Icon icon="el:eye-open" />
          </Link>
        </Tooltip>
      );
    default:
      return <DefaultCell>{item[columnKey] ?? 'N/A'}</DefaultCell>;
  }
}

export { Cell };
