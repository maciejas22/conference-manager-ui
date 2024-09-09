import { type ColumnKey } from './key';

export type ColumnConfig = {
  key: ColumnKey;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
};
