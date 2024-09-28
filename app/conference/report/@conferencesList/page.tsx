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
    associatedOnly: true,
  },
  visibleColumns: [
    ColumnKey.Title,
    ColumnKey.StartDate,
    ColumnKey.EndDate,
    ColumnKey.Location,
    ColumnKey.ParticipantsCount,
  ],
};

export default function ConferencesList() {
  return (
    <ConferencesTable
      defaultTableConfig={defaultTableConfig}
      topContentSettings={{
        settings: {
          isVisibleColumnsSelectVisible: false,
          areFiletrsVisible: false,
        },
      }}
    />
  );
}
