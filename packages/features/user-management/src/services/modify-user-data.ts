import { graphql, type VariablesOf } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const modifyUserDataMutation = graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
    }
  }
`);

type ModifyUserDataVariables = VariablesOf<
  typeof modifyUserDataMutation
>['updateUserInput'];

function modifyUserData(userData: ModifyUserDataVariables) {
  const gqlClient = getGqlClient();
  return gqlClient.request(modifyUserDataMutation, {
    updateUserInput: userData,
  });
}

export { modifyUserData };
