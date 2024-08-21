'use client';

import { Paper } from '@repo/shared/components';
import { Pagination, Select, SelectItem } from '@repo/shared/nextui';

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
    !!totalPages && (
      <Paper>
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
              updateTableConfig('page', { current: page, size: pageSize });
            }}
            disableAnimation={false}
            disableCursorAnimation={false}
          />
          <Select
            className="cm-max-w-28 cm-justify-self-end"
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
