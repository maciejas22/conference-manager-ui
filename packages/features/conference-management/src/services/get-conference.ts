import { graphql, type ResultOf } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const getConferenceQuery = graphql(`
  query GetConference($id: ID!) {
    conference(id: $id) {
      id
      title
      startDate
      endDate
      location
      website
      acronym
      additionalInfo
      participantsCount
      participantsLimit
      registrationDeadline
    }
  }
`);

export type Conference = NonNullable<
  ResultOf<typeof getConferenceQuery>['conference']
>;

export const getConference = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getConferenceQuery, { id });
};
