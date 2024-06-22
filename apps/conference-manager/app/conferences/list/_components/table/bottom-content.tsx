"use client";

import { Pagination } from "@nextui-org/pagination";
import { Select, SelectItem } from "@nextui-org/select";

import { useSearchParams } from "../../_hooks/use-search-params";
import { pageSizeOptions } from "../../_options";
import { ConferenceMeta } from "../../_types";

interface BottomContentProps {
  meta?: ConferenceMeta;
}

function BottomContent({ meta }: BottomContentProps) {
  const searchParamsCtx = useSearchParams();

  const totalItems = meta?.page.totalItems ?? 0;
  const totalPages = meta?.page.totalPages ?? 10;
  const currentPage = searchParamsCtx.searchParams.page || 1;
  const pageSize = searchParamsCtx.searchParams.pageSize;

  const itemsPointer = (currentPage - 1) * pageSize + 1;
  const lastItemPointer = Math.min(
    (currentPage - 1) * pageSize + pageSize,
    totalItems,
  );
  return (
    <div className="w-full grid grid-cols-3 items-center">
      <span className="justify-self-start">
        Showing {itemsPointer} - {lastItemPointer} of {totalItems} results
      </span>
      <Pagination
        color="primary"
        className="justify-self-center"
        total={totalPages}
        page={currentPage}
        onChange={(page) => {
          searchParamsCtx.setSearchParams({ page });
        }}
        disableAnimation={false}
        disableCursorAnimation={false}
      />
      <Select
        className="max-w-28 justify-self-end"
        label="Page Size"
        selectedKeys={[pageSize.toString()]}
        onChange={(value) => {
          searchParamsCtx.setSearchParams({
            ...searchParamsCtx.searchParams,
            pageSize: parseInt(value.target.value),
            page: 1,
          });
        }}
      >
        {pageSizeOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option.toString()}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export { BottomContent };
