'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination, Select, SelectItem } from '@repo/shared/nextui';

import { type GetConferencesQueryResponse } from '#services/get-conferences';

import { createQueryString, pageSizeOptions } from '../utils/search-params';

interface BottomContentProps {
  meta: GetConferencesQueryResponse['meta'];
}

function BottomContent({ meta }: BottomContentProps) {
  const searchParamsCtx = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const totalItems = meta.page.totalItems;
  const totalPages = meta.page.totalPages;
  const currentPage = Number(searchParamsCtx.get('page')) || 1;
  const pageSize = Number(searchParamsCtx.get('pageSize')) || 10;

  const itemsPointer = (currentPage - 1) * pageSize + 1;
  const lastItemPointer = Math.min(
    (currentPage - 1) * pageSize + pageSize,
    totalItems,
  );
  return (
    <div className="cm-w-full cm-grid cm-grid-cols-3 cm-items-center">
      <span className="cm-justify-self-start">
        Showing {itemsPointer} - {lastItemPointer} of {totalItems} results
      </span>
      <Pagination
        color="primary"
        className="cm-justify-self-center"
        total={totalPages}
        page={currentPage}
        onChange={(page) => {
          const params = createQueryString(searchParamsCtx, { page });
          router.push(`${pathname}?${params}`);
        }}
        disableAnimation={false}
        disableCursorAnimation={false}
      />
      <Select
        className="cm-max-w-28 cm-justify-self-end"
        label="Page Size"
        selectedKeys={[pageSize.toString()]}
        onChange={(value) => {
          const params = createQueryString(searchParamsCtx, {
            pageSize: parseInt(value.target.value),
            page: 1,
          });
          router.push(`${pathname}?${params}`);
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
