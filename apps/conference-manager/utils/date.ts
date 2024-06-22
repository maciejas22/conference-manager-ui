import { dayjs } from "@/lib/dayjs";

function getFormattedDateTime(date: string): string {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

function getFormattedDate(date: string): string {
  return dayjs(date).format("DD/MM/YYYY");
}

export { getFormattedDateTime, getFormattedDate };
