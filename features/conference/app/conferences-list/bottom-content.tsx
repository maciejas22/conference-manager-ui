'use client';

import { Pagination } from '@nextui-org/pagination';
import { Select, SelectItem } from '@nextui-org/select';

import { Paper } from '@/components/paper';

import { pageSizeOptions } from './config/table-config';
import { useTableContext } from './table-provider';

function BottomContent() {
  const { tableConfig, updateTableConfig, conferencesMetaData } =
    useTableContext();

  const totalItems = conferencesMetaData.page.totalItems;
  const totalPages = conferencesMetaData.page.totalPages;
  const currentPage = tableConfig.page.current;
  const pageSize = tableConfig.page.size;

  const itemsPointer = (currentPage - 1) * pageSize + 1;
  const lastItemPointer = Math.min(
    (currentPage - 1) * pageSize + pageSize,
    totalItems,
  );
  return (
    Boolean(totalPages) && (
      <Paper>
        <div className="grid w-full grid-cols-3 items-center">
          <span className="justify-self-start">
            Showing {itemsPointer} - {lastItemPointer} of {totalItems} results
          </span>
          <Pagination
            color="primary"
            className="justify-self-center"
            total={totalPages}
            page={currentPage}
            onChange={(page) => {
              updateTableConfig('page', { current: page, size: pageSize });
            }}
            disableAnimation={false}
            disableCursorAnimation={false}
          />
          <Select
            className="max-w-28 justify-self-end"
            label="Page Size"
            selectedKeys={[pageSize.toString()]}
            onChange={(value) => {
              updateTableConfig('page', {
                size: parseInt(value.target.value),
                current: 1,
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

export { BottomContent };
