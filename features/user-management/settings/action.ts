'use server';

import { revalidatePath } from 'next/cache';

import { graphql, type VariablesOf } from '@/libs/graphql';
import { FormStatus, ServerResponse } from '@/types/response';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const updateUserMutation = graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput)
  }
`);

export const updateUser = (
  input: VariablesOf<typeof updateUserMutation>['updateUserInput'],
): Promise<ServerResponse> =>
  serverFetcher({
    document: updateUserMutation,
    variables: { updateUserInput: input },
  })
    .then(() => ({
      status: FormStatus.Success,
      message: 'User updated successfully',
    }))
    .catch(() => ({
      status: FormStatus.Error,
      message: 'Failed to update user',
    }))
    .finally(() => {
      revalidatePath('/');
    });
