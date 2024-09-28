import { graphql } from '@/libs/graphql';

export const isUserAssociatedWithConferenceQuery = graphql(`
  query isUserAssociatedWithConference($conferenceId: ID!) {
    isUserAssociatedWithConference(conferenceId: $conferenceId)
  }
`);
