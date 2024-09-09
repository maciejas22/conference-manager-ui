'use client';

import { useState } from 'react';

import { Pagination } from '@repo/shared/components';
import {
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@repo/shared/nextui';
import { useQuery } from '@repo/shared/utils/fetchers/browser-fetcher';

import { getConferencesQuery } from '@/graphql/get-conferences';

import { columns, type ColumnKey } from './columns/config';
import { defaultTableConfig, type TableConfig } from './types/table-config';
import { queryVars } from './utils/query-vars';

const toggleSortOrder = (order: 'ascending' | 'descending') =>
  order === 'ascending' ? 'descending' : 'ascending';

export function ConferencesTable() {
  const [tableConfig, setTableConfig] =
    useState<TableConfig>(defaultTableConfig);
  const { data, isLoading } = useQuery({
    document: getConferencesQuery,
    variables: queryVars(tableConfig),
  });

  return (
    <>
      <Table
        aria-label="Conferences table"
        sortDescriptor={tableConfig.sort}
        onSortChange={(descriptor) => {
          const isSameColumn = descriptor.column === tableConfig.sort.column;
          const newOrder = isSameColumn
            ? toggleSortOrder(tableConfig.sort.order)
            : 'ascending';

          setTableConfig({
            ...tableConfig,
            sort: {
              column: descriptor.column as ColumnKey,
              order: newOrder,
            },
          });
        }}
      >
        <TableHeader>
          {columns
            .filter((column) => !column.hidden)
            .map((column) => (
              <TableColumn key={column.key} allowsSorting={column.sortable}>
                {column.label}
              </TableColumn>
            ))}
        </TableHeader>
        <TableBody
          items={data?.conferences?.data ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent="No conferences found"
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        totalItems={data?.conferences?.meta.page.totalItems ?? 0}
        currentPage={tableConfig.page.current}
        pageSize={tableConfig.page.size}
        onPageUpdate={({ page, pageSize }) => {
          setTableConfig({
            ...tableConfig,
            page: {
              ...tableConfig.page,
              current: page,
              size: pageSize,
            },
          });
        }}
      />
    </>
  );
}
