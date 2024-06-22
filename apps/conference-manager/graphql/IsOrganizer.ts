import { graphql } from "@/lib/graphql";

export default graphql(`
  query isOrganizer($conferenceID: ID!) {
    isOrganizer(conferenceId: $conferenceID)
  }
`);
