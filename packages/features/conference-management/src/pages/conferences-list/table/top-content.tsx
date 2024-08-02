'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icon } from '@iconify/react';

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
} from '@repo/libs/nextui';

import { useDebounce } from '#hooks/use-debounce/index';

import { createQueryString } from '../utils/search-params';
import { columns, type ColumnKey } from './columns';

interface TopContentProps {
  visibleColumns: ColumnKey[];
}

function TopContent({ visibleColumns }: TopContentProps) {
  const searchParamsCtx = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [title, setTitle] = useState(searchParamsCtx.get('title') ?? '');
  const debouncedTitle = useDebounce(title, 500);
  const selectedVisibleColumns = new Set(visibleColumns);

  useEffect(() => {
    const params = createQueryString(searchParamsCtx, {
      title: debouncedTitle,
    });
    router.push(`${pathname}?${params}`);
  }, [debouncedTitle, searchParamsCtx, router, pathname]);

  return (
    <div className="cm-flex gap-4 cm-w-full">
      <Input
        isClearable
        label="Search by title"
        placeholder="Type to search..."
        startContent={
          <Icon icon="radix-icons:magnifying-glass" className="cm-h-4" />
        }
        value={title}
        onValueChange={setTitle}
      />
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button className="cm-h-14">Columns</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Visible columns select"
          selectionMode="multiple"
          closeOnSelect={false}
          items={columns}
          selectedKeys={selectedVisibleColumns}
          onSelectionChange={(selection) => {
            const selectedKeys = Array.from(selection);
            const params = createQueryString(searchParamsCtx, {
              visibleColumns: selectedKeys as ColumnKey[],
            });
            router.push(`${pathname}?${params}`);
          }}
        >
          {(column) => (
            <DropdownItem key={column.key}>{column.label}</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Popover placement="bottom" showArrow backdrop="blur">
        <PopoverTrigger>
          <Button className="cm-h-14">Filters</Button>
        </PopoverTrigger>
        <PopoverContent className="">
          {(titleProps) => (
            <div className="cm-px-1 cm-py-2 cm-w-full">
              <p
                className="cm-text-small cm-font-bold cm-text-foreground"
                {...titleProps}
              >
                Filters
              </p>
              <div className="cm-mt-2 cm-flex cm-flex-col cm-gap-2 cm-w-full cm-whitespace-nowrap">
                <Switch
                  size="sm"
                  isSelected={searchParamsCtx.get('associatedOnly') === 'true'}
                  onValueChange={(isSelected) => {
                    const params = createQueryString(searchParamsCtx, {
                      associatedOnly: isSelected,
                    });
                    router.push(`${pathname}?${params}`);
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
  );
}

export { TopContent };
