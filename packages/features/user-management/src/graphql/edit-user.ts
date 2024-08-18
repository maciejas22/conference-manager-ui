import { graphql, type VariablesOf } from '@repo/shared/graphql';

export const modifyUserDataMutation = graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
    }
  }
`);

export type ModifyUserDataVariables = VariablesOf<
  typeof modifyUserDataMutation
>['updateUserInput'];
