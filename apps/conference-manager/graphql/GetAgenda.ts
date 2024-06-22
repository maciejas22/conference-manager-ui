import { graphql } from "@/lib/graphql";

export default graphql(`
  query GetAgenda($id: ID!) {
    conference(id: $id) {
      id
      agenda {
        id
        startTime
        endTime
        event
        speaker
      }
    }
  }
`);
