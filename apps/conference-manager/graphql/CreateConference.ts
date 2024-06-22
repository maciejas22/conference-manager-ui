import { graphql } from "@/lib/graphql";

export default graphql(`
  mutation CreateConference($createConferenceInput: CreateConferenceInput!) {
    createConference(createConferenceInput: $createConferenceInput) {
      id
    }
  }
`);
