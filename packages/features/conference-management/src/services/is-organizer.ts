import { graphql } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

export const isOrganizerQuery = graphql(`
  query isOrganizer($conferenceID: ID!) {
    isOrganizer(conferenceId: $conferenceID)
  }
`);

export const isOrganizer = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(isOrganizerQuery, { conferenceID: id });
};
