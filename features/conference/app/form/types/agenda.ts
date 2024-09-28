export type AgendaItem = {
  id?: number;
  speaker: string;
  event: string;
  startTime: string;
  endTime: string;
  _destroy?: boolean;
};
