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
} from '@repo/libs/nextui';

import { type GetConferencesQueryResponse } from '@/services/get-conferences';

import {
  columnKeyToFieldMap,
  fieldToColumnKeyMap,
  type SortField,
} from '../utils/field-maps';
import { createQueryString } from '../utils/search-params';
import { BottomContent } from './bottom-content';
import { Cell } from './cells';
import { columns, type ColumnKey } from './columns';
import { TopContent } from './top-content';

interface ConferencesTableProps {
  conferenceData: GetConferencesQueryResponse['data'];
  metaData: GetConferencesQueryResponse['meta'];
}

function ConferencesTable({ conferenceData, metaData }: ConferencesTableProps) {
  const searchParamsCtx = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      const columnField = columnKeyToFieldMap[descriptor.column as ColumnKey];
      const newDirection =
        columnField === searchParamsCtx.get('sort') &&
        searchParamsCtx.get('sortDirection') === 'ASC'
          ? 'DESC'
          : 'ASC';

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
      className="cm-mt-10"
      aria-label="Conference table list"
      topContent={<TopContent />}
      bottomContent={<BottomContent meta={metaData} />}
      sortDescriptor={{
        column: fieldToColumnKeyMap[searchParamsCtx.get('sort') as SortField],
        direction:
          searchParamsCtx.get('sortDirection') === 'ASC'
            ? 'ascending'
            : 'descending',
      }}
      onSortChange={handleSortChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting>
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
