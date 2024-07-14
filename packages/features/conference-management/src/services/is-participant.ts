import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const isParticipantQuery = graphql(`
  query isParticipant($conferenceID: ID!) {
    isParticipant(conferenceId: $conferenceID)
  }
`);

export const isParticipant = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(isParticipantQuery, { conferenceID: id });
};
