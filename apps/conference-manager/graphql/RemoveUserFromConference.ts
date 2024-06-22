import { graphql } from "@/lib/graphql";

export default graphql(`
  mutation RemoveUserFromConference($conferenceId: String!) {
    removeUserFromConference(conferenceId: $conferenceId) {
      id
    }
  }
`);
