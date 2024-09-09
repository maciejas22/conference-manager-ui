import { Column, ColumnKey } from '../../columns/types/key';

export const columnKeyToFieldMap: Record<ColumnKey, Column> = {
  [ColumnKey.Id]: Column.Id,
  [ColumnKey.Title]: Column.Title,
  [ColumnKey.StartDate]: Column.StartDate,
  [ColumnKey.EndDate]: Column.EndDate,
  [ColumnKey.Location]: Column.Location,
  [ColumnKey.ParticipantsCount]: Column.ParticipantsCount,
  [ColumnKey.EventsCount]: Column.EventsCount,
};

export const fieldToColumnKeyMap: Record<Column, ColumnKey> =
  Object.fromEntries(
    Object.entries(columnKeyToFieldMap).map(([key, value]) => [value, key]),
  ) as Record<Column, ColumnKey>;
