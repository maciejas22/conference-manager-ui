import { graphql } from '@/lib/graphql';

export default graphql(`
  mutation AddUserToConference($conferenceId: String!) {
    addUserToConference(conferenceId: $conferenceId) {
      id
    }
  }
`);
