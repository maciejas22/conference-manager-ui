'use client';

import { Table } from './table';
import { TableProvider } from './table-provider';
import { TopContent } from './top-content';

function ConferencesTable() {
  return (
    <TableProvider>
      <TopContent />
      <Table />
    </TableProvider>
  );
}

export { ConferencesTable };
