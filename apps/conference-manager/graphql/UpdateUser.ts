import { graphql } from "@/lib/graphql";

export default graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
    }
  }
`);
