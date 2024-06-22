"use client";

import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Switch } from "@nextui-org/switch";

import useDebounce from "@/hooks/use-debounce";

import { useSearchParams } from "../../_hooks/use-search-params";

function TopContent() {
  const searchParamsCtx = useSearchParams();
  const searchParams = searchParamsCtx.searchParams;
  const [title, setTitle] = useState(searchParams.title);
  const debouncedTitle = useDebounce(title, 500);

  useEffect(() => {
    searchParamsCtx.setSearchParams({ title: debouncedTitle });
  }, [debouncedTitle, searchParamsCtx]);

  return (
    <div className="flex gap-4">
      <Input
        isClearable
        label="Search by title"
        placeholder="Type to search..."
        startContent={<MagnifyingGlassIcon className="h-4" />}
        value={title}
        onValueChange={setTitle}
      />
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
                  isSelected={searchParams.associatedOnly}
                  onValueChange={(isSelected) => {
                    searchParamsCtx.setSearchParams({
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
  );
}

export { TopContent };
