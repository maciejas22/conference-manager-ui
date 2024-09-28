'use client';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';

import { columns } from '../config/column-config';
import { useTableContext } from '../table-provider';
import { ColumnKey } from '../types/column';

export function VisibleColumnsSelect() {
  const { tableConfig, updateTableConfig } = useTableContext();
  const visibleColumns = new Set(tableConfig.visibleColumns);

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className="h-14">Columns</Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Visible columns select"
        selectionMode="multiple"
        closeOnSelect={false}
        items={columns}
        selectedKeys={visibleColumns}
        onSelectionChange={(selection) => {
          updateTableConfig(
            'visibleColumns',
            Array.from(selection) as ColumnKey[],
          );
        }}
      >
        {(column) => (
          <DropdownItem key={column.key}>{column.label}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
