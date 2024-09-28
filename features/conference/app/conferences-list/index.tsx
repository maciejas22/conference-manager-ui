import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/libs/tanstack-query';

import { getConferences } from './actions';
import { Table } from './table';
import { TableProvider } from './table-provider';
import { TopContent } from './top-content';
import { ColumnKey } from './types/column';
import { TableConfig } from './types/table-config';
import { queryVars } from './utils/query-vars';

type ConferencesTableProps = {
  defaultTableConfig: TableConfig;
  topContentSettings?: React.ComponentProps<typeof TopContent>;
};

export async function ConferencesTable(props: ConferencesTableProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['conferences', queryVars(props.defaultTableConfig)],
    queryFn: () => getConferences(queryVars(props.defaultTableConfig)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TableProvider defaultTableConfig={props.defaultTableConfig}>
        <TopContent {...props.topContentSettings} />
        <Table />
      </TableProvider>
    </HydrationBoundary>
  );
}

export { type TableConfig, ColumnKey };
