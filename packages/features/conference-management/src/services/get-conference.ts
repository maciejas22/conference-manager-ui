import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const getConferenceQuery = graphql(`
  query GetConference($id: ID!) {
    conference(id: $id) {
      id
      title
      date
      location
      additionalInfo
      participantsCount
      participantsLimit
      registrationDeadline
    }
  }
`);

export const getConference = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(getConferenceQuery, { id });
};
