import { z } from 'zod';

import { type ColumnKey } from '../../table/columns';
import { type searchParamsSchema } from '../search-params';

export type SortField = z.infer<typeof searchParamsSchema>['sort'];

export const fieldToColumnKeyMap: Record<SortField, ColumnKey> = {
  date: 'date',
  title: 'title',
  location: 'location',
  participants_count: 'participantsCount',
};

export const columnKeyToFieldMap: Record<ColumnKey, SortField> = {
  date: 'date',
  title: 'title',
  location: 'location',
  participantsCount: 'participants_count',
};
