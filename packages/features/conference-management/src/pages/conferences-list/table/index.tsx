'use client';

import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type SortDescriptor,
} from '@repo/shared/nextui';

import { type GetConferencesQueryResponse } from '#services/get-conferences';

import {
  createQueryString,
  defaultSearchParams,
  SortDirection,
} from '../utils/search-params';
import { Cell } from './cells';
import { ColumnKey, columns } from './columns';

interface ConferencesTableProps {
  conferenceData: GetConferencesQueryResponse['data'];
  visibleColumns: ColumnKey[];
}

function ConferencesTable({
  conferenceData,
  visibleColumns,
}: ConferencesTableProps) {
  const searchParamsCtx = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      const columnField = descriptor.column
        ? (descriptor.column as ColumnKey)
        : defaultSearchParams.sort;
      const newDirection =
        columnField === searchParamsCtx.get('sort') &&
        searchParamsCtx.get('sortDirection') === 'ASC'
          ? SortDirection.Desc
          : SortDirection.Asc;

      const newParams = createQueryString(searchParamsCtx, {
        sort: columnField,
        sortDirection: newDirection,
      });
      router.push(`${pathname}?${newParams}`);
    },
    [searchParamsCtx, router, pathname],
  );

  return (
    <Table
      aria-label="Conference table list"
      sortDescriptor={{
        column: searchParamsCtx.get('sort') as ColumnKey,
        direction:
          searchParamsCtx.get('sortDirection') === 'ASC'
            ? 'ascending'
            : 'descending',
      }}
      onSortChange={handleSortChange}
      shadow="none"
    >
      <TableHeader
        columns={columns.filter((c) => visibleColumns.includes(c.key))}
      >
        {(column) => (
          <TableColumn
            key={column.key}
            allowsSorting={column.sortable}
            align={column.key === ColumnKey.Actions ? 'center' : 'start'}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={conferenceData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <Cell item={item} columnKey={columnKey as ColumnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { ConferencesTable };
