import { graphql } from '@repo/shared/graphql';

export const removeUserFromConferenceMutation = graphql(`
  mutation RemoveUserFromConference($conferenceId: String!) {
    removeUserFromConference(conferenceId: $conferenceId) {
      id
    }
  }
`);
