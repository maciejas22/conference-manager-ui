import { z } from 'zod';

export const pageSizeOptions = [10, 25, 50, 100];

export const defaultSearchParams = {
  page: 1,
  pageSize: pageSizeOptions[0] ?? 10,
  sort: 'date',
  sortDirection: 'DESC',
  associatedOnly: false,
  title: '',
} as const;

export const searchParamsSchema = z
  .object({
    page: z.number().int().positive(),
    pageSize: z
      .number()
      .int()
      .positive()
      .refine((val) => pageSizeOptions.includes(val)),
    sort: z.union([
      z.literal('date'),
      z.literal('title'),
      z.literal('location'),
      z.literal('participants_count'),
    ]),
    sortDirection: z.union([z.literal('ASC'), z.literal('DESC')]),
    associatedOnly: z.boolean(),
    title: z.string(),
  })
  .catch(defaultSearchParams);

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
