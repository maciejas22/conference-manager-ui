'use client';

import { Link } from '@repo/libs/nextui';
import { getFormattedDateTime } from '@repo/utils';

import { type GetConferencesQueryResponse } from '#services/get-conferences';

import { type ColumnKey } from './columns';

interface CellProps {
  item: GetConferencesQueryResponse['data'][number];
  columnKey: ColumnKey;
}

function Cell({ item, columnKey }: CellProps) {
  switch (columnKey) {
    case 'title':
      return <Link href={`/conference/${item.id}`}>{item.title}</Link>;
    case 'date':
      return <span>{getFormattedDateTime(item[columnKey])}</span>;
    default:
      return <span>{item[columnKey]}</span>;
  }
}

export { Cell };
