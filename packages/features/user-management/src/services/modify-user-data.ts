import { type VariablesOf } from '@repo/libs/graphql';
import { getGqlClient } from '@repo/libs/graphql-client';

import { modifyUserDataMutation } from '../graphql/modify-user-data';

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
