'use client';

import { useRouter } from 'next/navigation';

import { getFormattedDateTime } from '@repo/utils';

import { type GetConferencesQueryResponse } from '#services/get-conferences';

import { type ColumnKey } from './columns';

interface CellProps {
  item: GetConferencesQueryResponse['data'][number];
  columnKey: ColumnKey;
}

function Cell({ item, columnKey }: CellProps) {
  const router = useRouter();

  switch (columnKey) {
    case 'title':
      return (
        <span
          onClick={() => {
            router.push(`/conference/${item.id}`);
          }}
          className="cm-cursor-pointer"
        >
          {item.title}
        </span>
      );
    case 'date':
      return <span>{getFormattedDateTime(item[columnKey])}</span>;
    default:
      return <span>{item[columnKey]}</span>;
  }
}

export { Cell };
