'use client';

import { Icon } from '@iconify/react';

import { Paper } from '@repo/shared/components';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@repo/shared/nextui';

import { columns, type ColumnKey } from './columns';
import { useTableContext } from './table-provider';

function TopContent() {
  const { tableConfig, updateTableConfig } = useTableContext();
  const visibleColumns = new Set(tableConfig.visibleColumns);

  return (
    <Paper>
      <div className="flex w-full gap-4">
        <Input
          isClearable
          label="Search by title"
          placeholder="Type to search..."
          startContent={
            <Icon icon="radix-icons:magnifying-glass" className="h-4" />
          }
          value={tableConfig.filters.title ?? ''}
          onValueChange={(newValue) => {
            updateTableConfig('filters', {
              ...tableConfig.filters,
              title: newValue,
            });
          }}
        />
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
        <Popover placement="bottom" showArrow backdrop="blur">
          <PopoverTrigger>
            <Button className="h-14">Filters</Button>
          </PopoverTrigger>
          <PopoverContent className="">
            {(titleProps) => (
              <div className="px-1 py-2 w-full">
                <p
                  className="text-small font-bold text-foreground"
                  {...titleProps}
                >
                  Filters
                </p>
                <div className="mt-2 flex flex-col gap-2 w-full whitespace-nowrap">
                  <Switch
                    size="sm"
                    isSelected={Boolean(tableConfig.filters.associatedOnly)}
                    onValueChange={(isSelected) => {
                      updateTableConfig('filters', {
                        ...tableConfig.filters,
                        associatedOnly: isSelected,
                      });
                    }}
                  >
                    Show associated only?
                  </Switch>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </Paper>
  );
}

export { TopContent };
