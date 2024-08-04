import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const isOrganizerQuery = graphql(`
  query isOrganizer($conferenceID: ID!) {
    isOrganizer(conferenceId: $conferenceID)
  }
`);

export const isOrganizer = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(isOrganizerQuery, { conferenceID: id });
};
