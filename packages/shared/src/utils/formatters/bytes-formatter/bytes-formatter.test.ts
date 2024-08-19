import { describe, expect, it } from 'vitest';

import { formatBytes } from '.';

describe('formatBytes', () => {
  it.each([
    [0, 2, '0 Bytes'],
    [1024, 2, '1 KB'],
    [1048576, 2, '1 MB'],
    [1073741824, 2, '1 GB'],
    [1099511627776, 2, '1 TB'],
    [1125899906842624, 2, '1 PB'],
    [1152921504606846976, 2, '1 EB'],
    [1180591620717411303424, 2, '1 ZB'],
    [1208925819614629174706176, 2, '1 YB'],
    [1024, 0, '1 KB'],
    [1048576, 0, '1 MB'],
    [1073741824, 0, '1 GB'],
    [123456789, 2, '117.74 MB'],
    [123456789, 0, '118 MB'],
    [123456789, -1, '118 MB'],
    [123456789, 3, '117.738 MB'],
  ])('formats %i bytes with %i decimals as %s', (bytes, decimals, expected) => {
    expect(formatBytes(bytes, decimals)).toBe(expected);
  });
});
