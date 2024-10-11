'use client';

import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Switch } from '@nextui-org/switch';

import { useTableContext } from '../table-provider';

export function Filters() {
  const { tableConfig, updateTableConfig } = useTableContext();

  return (
    <Popover placement="bottom" showArrow backdrop="blur">
      <PopoverTrigger>
        <Button className="h-14">Filters</Button>
      </PopoverTrigger>
      <PopoverContent className="">
        {(titleProps) => (
          <div className="w-full px-1 py-2">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Filters
            </p>
            <div className="mt-2 flex w-full flex-col gap-2 whitespace-nowrap">
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
  );
}
