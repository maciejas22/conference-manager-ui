import { queryOptions } from '@tanstack/react-query';

import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getNewsQuery = graphql(`
  query GetNews($page: Page) {
    news(page: $page) {
      data {
        id
        title
        content
        date
      }
      meta {
        page {
          totalItems
          totalPages
          number
          size
        }
      }
    }
  }
`);

export const newsConfig = {
  initialPageSize: 10,
  initialPageNumber: 1,
};

export const getNewsQueryOptions = (
  pageNumber = newsConfig.initialPageNumber,
  pageSize = newsConfig.initialPageSize,
) =>
  queryOptions({
    queryKey: ['news', `pageSize=${pageSize}`, `pageNumber=${pageNumber}`],
    queryFn: async () =>
      serverFetcher({
        document: getNewsQuery,
        variables: {
          page: {
            number: pageNumber,
            size: pageSize,
          },
        },
      }),
  });
