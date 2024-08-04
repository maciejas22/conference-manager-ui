import { graphql } from '@repo/shared/graphql';

export const modifyUserDataMutation = graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
    }
  }
`);
