import { z } from 'zod';

import { ColumnKey } from '../../table/columns';

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export const pageSizeOptions = [10, 25, 50, 100];

export const defaultSearchParams = {
  page: 1,
  pageSize: pageSizeOptions[0] ?? 10,
  sort: ColumnKey.StartDate,
  sortDirection: SortDirection.Desc,
  associatedOnly: false,
  title: '',
  visibleColumns: [
    ColumnKey.Title,
    ColumnKey.Acronym,
    ColumnKey.StartDate,
    ColumnKey.Location,
    ColumnKey.Actions,
  ],
};

export const searchParamsSchema = z.object({
  page: z.number().int().positive().catch(defaultSearchParams.page),
  pageSize: z
    .number()
    .int()
    .positive()
    .refine((val) => pageSizeOptions.includes(val))
    .catch(defaultSearchParams.pageSize),
  sort: z.nativeEnum(ColumnKey).catch(defaultSearchParams.sort),
  sortDirection: z
    .nativeEnum(SortDirection)
    .catch(defaultSearchParams.sortDirection),
  associatedOnly: z.boolean().catch(false),
  title: z.string().catch(''),
  visibleColumns: z
    .array(z.nativeEnum(ColumnKey))
    .min(1)
    .catch(defaultSearchParams.visibleColumns),
});

type SearchParams = z.infer<typeof searchParamsSchema>;
export const createQueryString = (
  searchParams: URLSearchParams,
  newParams: Partial<SearchParams>,
) => {
  const params = new URLSearchParams(searchParams.toString());
  for (const [key, value] of Object.entries(newParams)) {
    params.set(key, value.toString());
  }
  return params.toString();
};
