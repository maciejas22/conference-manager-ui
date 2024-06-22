import { graphql } from "@/lib/graphql";

export default graphql(`
  query GetAssociatedConferences {
    associatedConferences {
      id
      title
      date
      location
      participantsCount
    }
  }
`);
