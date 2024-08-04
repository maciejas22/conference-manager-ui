import { graphql, type ResultOf, type VariablesOf } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const getConferencesQuery = graphql(`
  query GetConferences($filters: ConferenceFilter, $page: Page, $sort: Sort) {
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

export const getConferences = (vars: GetConferencesQueryVariables) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getConferencesQuery, vars);
};
