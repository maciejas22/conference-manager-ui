import { graphql } from "@/lib/graphql";

export default graphql(`
  query GetConferences($filters: ConferenceFilter, $page: Page) {
    conferences(filters: $filters, page: $page) {
      data {
        id
        title
        date
        location
        participantsCount
      }
      meta {
        page {
          totalItems
          totalPages
        }
      }
    }
  }
`);
