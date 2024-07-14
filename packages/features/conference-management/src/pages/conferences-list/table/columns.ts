import { type GetConferencesQueryResponse } from '#services/get-conferences';

type ColumnKey = Exclude<
  keyof GetConferencesQueryResponse['data'][number],
  'id'
>;

interface Column {
  key: ColumnKey;
  label: string;
}

const columns: Column[] = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'location', label: 'Location' },
  { key: 'participantsCount', label: 'Participants Count' },
];

export { columns, type Column, type ColumnKey };
