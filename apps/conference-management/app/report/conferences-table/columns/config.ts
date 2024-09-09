import { type ColumnConfig } from './types/config';
import { ColumnKey } from './types/key';

const columns: ColumnConfig[] = [
  { key: ColumnKey.Id, label: 'ID', hidden: true },
  { key: ColumnKey.Title, label: 'Title', sortable: true },
  { key: ColumnKey.StartDate, label: 'Start Date', sortable: true },
  { key: ColumnKey.EndDate, label: 'End Date', sortable: true },
  { key: ColumnKey.Location, label: 'Location', sortable: true },
  {
    key: ColumnKey.ParticipantsCount,
    label: 'Participants Count',
  },
  { key: ColumnKey.EventsCount, label: 'Events Count' },
];

export { ColumnKey, columns };
