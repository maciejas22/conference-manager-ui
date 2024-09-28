import { Column, ColumnKey } from '../../types/column';

export const columnKeyToFieldMap: Record<ColumnKey, Column> = {
  [ColumnKey.Id]: Column.Id,
  [ColumnKey.Title]: Column.Title,
  [ColumnKey.Acronym]: Column.Acronym,
  [ColumnKey.StartDate]: Column.StartDate,
  [ColumnKey.EndDate]: Column.EndDate,
  [ColumnKey.Location]: Column.Location,
  [ColumnKey.ParticipantsCount]: Column.ParticipantsCount,
  [ColumnKey.RegistrationDeadline]: Column.RegistrationDeadline,
  [ColumnKey.Actions]: Column.Actions,
};

export const fieldToColumnKeyMap: Record<Column, ColumnKey> =
  Object.fromEntries(
    Object.entries(columnKeyToFieldMap).map(([key, value]) => [value, key]),
  ) as Record<Column, ColumnKey>;
