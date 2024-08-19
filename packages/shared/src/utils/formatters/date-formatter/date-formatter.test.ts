import { parseZonedDateTime } from '@internationalized/date';
import { describe, expect, it } from 'vitest';

import { getFormattedDate, getFormattedDateTime } from '.';

describe('Date Formatter Functions', () => {
  const testCases = [
    {
      date: parseZonedDateTime('2024-08-19T14:30:00+00:00[UTC]'),
      formattedDate: '2024-08-19',
      formattedDateTime: '2024-08-19 14:30',
    },
    {
      date: parseZonedDateTime('2024-01-01T00:00:00+00:00[UTC]'),
      formattedDate: '2024-01-01',
      formattedDateTime: '2024-01-01 00:00',
    },
    {
      date: parseZonedDateTime('2024-12-31T23:59:00+00:00[UTC]'),
      formattedDate: '2024-12-31',
      formattedDateTime: '2024-12-31 23:59',
    },
  ];

  it.each(testCases)(
    'formats date $date correctly',
    ({ date, formattedDate, formattedDateTime }) => {
      expect(getFormattedDate(date)).toBe(formattedDate);
      expect(getFormattedDateTime(date)).toBe(formattedDateTime);
    },
  );
});
