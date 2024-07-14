import { graphql } from '@repo/libs/graphql';

export const modifyUserDataMutation = graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
    }
  }
`);
