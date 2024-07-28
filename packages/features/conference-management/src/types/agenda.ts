export interface AgendaItem {
  id?: string;
  speaker: string;
  event: string;
  startTime: string;
  endTime: string;
  _destroy?: boolean;
}
