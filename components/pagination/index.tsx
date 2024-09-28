'use client';

import { Pagination as NextPagination } from '@nextui-org/pagination';
import { Select, SelectItem } from '@nextui-org/select';

import { Paper } from '../paper';

const pageSizeOptions = [10, 25, 50, 100];

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageUpdate: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
};

export function Pagination({
  totalItems,
  currentPage,
  pageSize,
  onPageUpdate,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const itemsPointer = (currentPage - 1) * pageSize + 1;
  const lastItemPointer = Math.min(currentPage * pageSize, totalItems);
  return (
    Boolean(totalPages) && (
      <Paper>
        <div className="w-full grid grid-cols-3 items-center">
          <span className="justify-self-start">
            Showing {itemsPointer} - {lastItemPointer} of {totalItems} results
          </span>
          <NextPagination
            color="primary"
            className="justify-self-center"
            total={totalPages}
            page={currentPage}
            onChange={(page) => {
              onPageUpdate({ page, pageSize });
            }}
            disableAnimation={false}
            disableCursorAnimation={false}
          />
          <Select
            className="max-w-28 justify-self-end"
            label="Page Size"
            selectedKeys={[pageSize.toString()]}
            onChange={(value) => {
              onPageUpdate({
                page: 1,
                pageSize: parseInt(value.target.value),
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
      </Paper>
    )
  );
}
