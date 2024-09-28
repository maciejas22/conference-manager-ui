import {
  ColumnKey,
  ConferencesTable,
  type TableConfig,
} from '@/features/conference/app/conferences-list';

const defaultTableConfig: TableConfig = {
  sort: {
    order: 'ascending',
    column: ColumnKey.Title,
  },
  page: {
    current: 1,
    size: 10,
  },
  filters: {
    associatedOnly: false,
  },
  visibleColumns: [
    ColumnKey.Title,
    ColumnKey.StartDate,
    ColumnKey.Location,
    ColumnKey.ParticipantsCount,
    ColumnKey.Actions,
  ],
};

export default function ConferencesList() {
  return <ConferencesTable defaultTableConfig={defaultTableConfig} />;
}
