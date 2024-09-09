import { type GetConferencesQueryVariables } from '@/graphql/get-conferences';

import { type TableConfig } from '../types/table-config';
import { columnKeyToFieldMap } from './field-maps';

export const queryVars = (
  tableConfig: TableConfig,
): GetConferencesQueryVariables => ({
  sort: {
    order: tableConfig.sort.order === 'ascending' ? 'ASC' : 'DESC',
    column: columnKeyToFieldMap[tableConfig.sort.column],
  },
  page: {
    number: tableConfig.page.current,
    size: tableConfig.page.size,
  },
  filters: {
    associatedOnly: tableConfig.filters.associatedOnly,
  },
});
