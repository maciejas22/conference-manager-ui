import { graphql } from '@/libs/graphql';

export const getNewsFragment = graphql(`
  fragment NewsFragment on NewsPage {
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
`);
