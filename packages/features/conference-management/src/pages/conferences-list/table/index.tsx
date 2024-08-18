'use client';

import { BottomContent } from './bottom-content';
import { Table } from './table';
import { TableProvider } from './table-provider';
import { TopContent } from './top-content';

function ConferencesTable() {
  return (
    <TableProvider>
      <TopContent />
      <Table />
      <BottomContent />
    </TableProvider>
  );
}

export { ConferencesTable };
