'use client';

import { Icon } from '@iconify/react';
import { Input } from '@nextui-org/input';

import { useTableContext } from '../table-provider';

export function SearchBar() {
  const { tableConfig, updateTableConfig } = useTableContext();

  return (
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
  );
}
