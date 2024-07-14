import { graphql, type ResultOf, type VariablesOf } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const getConferencesQuery = graphql(`
  query GetConferences($filters: ConferenceFilter, $page: Page, $sort: Sort) {
    conferences(filters: $filters, page: $page, sort: $sort) {
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
