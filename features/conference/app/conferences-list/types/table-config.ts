import { GetConferencesQueryVariables } from '../actions/query';
import { ColumnKey } from './column';

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
  visibleColumns: ColumnKey[];
};
