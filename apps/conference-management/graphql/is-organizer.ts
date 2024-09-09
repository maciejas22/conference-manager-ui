import { graphql } from '@repo/shared/graphql';

export const isOrganizerQuery = graphql(`
  query isOrganizer($conferenceID: ID!) {
    isOrganizer(conferenceId: $conferenceID)
  }
`);
