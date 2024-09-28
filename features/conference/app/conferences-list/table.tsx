'use client';

import { Spinner } from '@nextui-org/spinner';
import {
  Table as NextTable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { Pagination } from '@/components';

import { Cell } from './cells';
import { columns } from './config/column-config';
import { useTableContext } from './table-provider';
import { ColumnKey } from './types/column';

export function Table() {
  const {
    isPending,
    tableConfig,
    conferences,
    conferencesMetaData,
    handleSortChange,
    updateTableConfig,
  } = useTableContext();

  return (
    <>
      <NextTable
        aria-label="Conference table list"
        sortDescriptor={{
          column: tableConfig.sort.column,
          direction: tableConfig.sort.order,
        }}
        onSortChange={handleSortChange}
        shadow="none"
      >
        <TableHeader
          columns={columns.filter((c) =>
            tableConfig.visibleColumns.includes(c.key),
          )}
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
        <TableBody
          items={conferences}
          isLoading={isPending}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent="No conferences found"
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
      </NextTable>
      <Pagination
        totalItems={conferencesMetaData.page.totalItems}
        currentPage={tableConfig.page.current}
        pageSize={tableConfig.page.size}
        onPageUpdate={({ page, pageSize }) => {
          updateTableConfig('page', {
            current: page,
            size: pageSize,
          });
        }}
      />
    </>
  );
}
