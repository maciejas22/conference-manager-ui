'use server';

import { graphql, VariablesOf } from '@/libs/graphql';
import { FormStatus, ServerResponse } from '@/types/response';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const editPasswordMutation = graphql(`
  mutation EditPassword($password: String!) {
    editPassword(password: $password)
  }
`);

export const changePassword = (
  input: VariablesOf<typeof editPasswordMutation>['password'],
): Promise<ServerResponse> =>
  serverFetcher({
    document: editPasswordMutation,
    variables: { password: input },
  })
    .then(() => ({
      status: FormStatus.Success,
      message: 'Password changed successfully',
    }))
    .catch(() => ({
      status: FormStatus.Error,
      message: 'Failed to change password',
    }));
