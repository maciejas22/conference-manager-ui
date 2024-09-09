import { graphql } from '@repo/shared/graphql';

export const addUserToConferenceMutation = graphql(`
  mutation AddUserToConference($conferenceId: String!) {
    addUserToConference(conferenceId: $conferenceId) {
      id
    }
  }
`);
