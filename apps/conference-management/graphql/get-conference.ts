import { graphql, type ResultOf } from '@repo/shared/graphql';

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
      eventsCount
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
