'use client';

import {
  Table as NextTable,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@repo/shared/nextui';

import { Cell } from './cells';
import { ColumnKey, columns } from './columns';
import { useTableContext } from './table-provider';

export function Table() {
  const { isPending, tableConfig, conferences, handleSortChange } =
    useTableContext();

  return (
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
  );
}
