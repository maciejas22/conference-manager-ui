import { graphql } from "@/lib/graphql";

export default graphql(`
  mutation ModifyConference($input: ModifyConferenceInput!) {
    modifyConference(input: $input) {
      id
    }
  }
`);
