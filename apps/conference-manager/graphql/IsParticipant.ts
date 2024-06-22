import { graphql } from "@/lib/graphql";

export default graphql(`
  query isParticipant($conferenceID: ID!) {
    isParticipant(conferenceId: $conferenceID)
  }
`);
