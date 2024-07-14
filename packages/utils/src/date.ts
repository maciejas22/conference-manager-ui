import { dayjs } from '@repo/libs/dayjs';

function getFormattedDateTime(date: string): string {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
}

function getFormattedDate(date: string): string {
  return dayjs(date).format('DD/MM/YYYY');
}

export { getFormattedDate, getFormattedDateTime };
