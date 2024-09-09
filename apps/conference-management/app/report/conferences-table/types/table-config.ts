import { type GetConferencesQueryVariables } from '@/graphql/get-conferences';

import { ColumnKey } from '../columns/types/key';

export type TableConfig = {
  sort: {
    order: 'ascending' | 'descending';
    column: ColumnKey;
  };
  page: {
    current: number;
    size: number;
  };
  filters: NonNullable<GetConferencesQueryVariables['filters']>;
};

export const defaultTableConfig: TableConfig = {
  sort: {
    order: 'ascending',
    column: ColumnKey.Title,
  },
  page: {
    current: 1,
    size: 10,
  },
  filters: {
    associatedOnly: true,
  },
};
