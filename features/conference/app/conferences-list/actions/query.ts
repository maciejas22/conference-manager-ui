import { graphql, type ResultOf, type VariablesOf } from '@/libs/graphql';

export const getConferencesQuery = graphql(`
  query GetConferences($filters: ConferencesFilters, $page: Page, $sort: Sort) {
    conferences(filters: $filters, page: $page, sort: $sort) {
      data {
        id
        title
        acronym
        startDate
        endDate
        location
        participantsCount
        registrationDeadline
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

export type GetConferencesQueryVariables = VariablesOf<
  typeof getConferencesQuery
>;
export type GetConferencesQueryResponse = NonNullable<
  ResultOf<typeof getConferencesQuery>['conferences']
>;
