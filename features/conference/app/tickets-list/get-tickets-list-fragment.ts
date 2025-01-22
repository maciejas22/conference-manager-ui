import { graphql } from '@/libs/graphql';

export const getUserTicketsFragment = graphql(`
  fragment UserTickets on User {
    tickets(page: $page) {
      data {
        id
        conference {
          id
          title
          startDate
          endDate
        }
      }
      meta {
        number
        size
        totalItems
        totalPages
      }
    }
  }
`);
