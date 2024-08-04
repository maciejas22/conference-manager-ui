import { graphql, type ResultOf } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

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
      files {
        id
        name
        size
        url
      }
    }
  }
`);

export type Conference = NonNullable<
  ResultOf<typeof getConferenceQuery>['conference']
>;

export type RemoteFile = NonNullable<
  ResultOf<typeof getConferenceQuery>['conference']
>['files'][number] & { _destroy?: boolean };

export const getConference = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getConferenceQuery, { id });
};
