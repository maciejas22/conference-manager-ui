import { type ZonedDateTime } from "@internationalized/date";

function padWithZero(value: number): string {
  return value.toString().padStart(2, "0");
}

function getFormattedDate(date: ZonedDateTime): string {
  return `${date.year}-${padWithZero(date.month)}-${padWithZero(date.day)}`;
}

function getFormattedTime(date: ZonedDateTime): string {
  return `${padWithZero(date.hour)}:${padWithZero(date.minute)}`;
}

function getFormattedDateTime(date: ZonedDateTime): string {
  return `${getFormattedDate(date)} ${getFormattedTime(date)}`;
}

export { getFormattedDate, getFormattedDateTime };
