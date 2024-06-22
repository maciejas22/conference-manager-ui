'use client';

import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/spinner';
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@repo/libs/nextui';

import { Order } from '@/graphql/__types__/types';

import { getConferencesQueryOptions } from '@/services/conference/queries';

import { useSearchParams } from '../../_hooks/use-search-params';
import { columnKeyToFieldMap, fieldToColumnKeyMap } from '../../_utils';
import { BottomContent } from './bottom-content';
import { Cell } from './cells';
import { ColumnKey, columns } from './columns';
import { TopContent } from './top-content';

function ConferencesTable() {
  const searchParamsCtx = useSearchParams();
  const searchParams = searchParamsCtx.searchParams;

  const { data, isLoading } = useQuery(
    getConferencesQueryOptions({
      filters: {
        sort: {
          column: searchParamsCtx.searchParams.sort,
          order: searchParamsCtx.searchParams.sortDirection,
        },
        associatedOnly: searchParamsCtx.searchParams.associatedOnly,
        title: searchParamsCtx.searchParams.title,
      },
      page: {
        number: searchParamsCtx.searchParams.page,
        size: searchParamsCtx.searchParams.pageSize,
      },
    }),
  );

  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      const columnField = columnKeyToFieldMap[descriptor.column as ColumnKey];
      const newDirection =
        columnField === searchParams.sort &&
        searchParams.sortDirection === Order.Asc
          ? Order.Desc
          : Order.Asc;

      searchParamsCtx.setSearchParams({
        sort: columnField,
        sortDirection: newDirection,
      });
    },
    [searchParamsCtx, searchParams],
  );

  return (
    <Table
      className="mt-10"
      aria-label="Conference table list"
      topContent={<TopContent />}
      bottomContent={<BottomContent meta={data?.conferences?.meta} />}
      sortDescriptor={{
        column: fieldToColumnKeyMap[searchParams.sort],
        direction:
          searchParams.sortDirection === Order.Asc ? 'ascending' : 'descending',
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
      <TableBody
        items={data?.conferences?.data ?? []}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
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
