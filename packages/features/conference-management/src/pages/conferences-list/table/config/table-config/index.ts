import { type GetConferencesQueryVariables } from '#graphql/get-conferences';

import { ColumnKey } from '../../types/column';

export const pageSizeOptions = [10, 25, 50, 100];

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

export const defaultTableConfig: TableConfig = {
  sort: {
    order: 'ascending',
    column: ColumnKey.Id,
  },
  page: {
    current: 1,
    size: 10,
  },
  filters: {
    associatedOnly: false,
    title: undefined,
  },
  visibleColumns: [
    ColumnKey.Title,
    ColumnKey.StartDate,
    ColumnKey.Location,
    ColumnKey.ParticipantsCount,
    ColumnKey.Actions,
  ],
};
