'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { modifyUserDataMutation } from '@/graphql/edit-user';
import { type FormStatus } from '@/types/form-status';

type ModifyUserDataResponse = {
  status: FormStatus;
  message: string;
};

export const modifyUserDataAction = async (
  name: string,
  surname: string,
  username: string,
  email: string,
): Promise<ModifyUserDataResponse> => {
  try {
    await serverFetcher({
      document: modifyUserDataMutation,
      variables: {
        updateUserInput: {
          name,
          surname,
          username,
          email,
        },
      },
    });
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to update user',
    };
  }
  return {
    status: 'success',
    message: 'User updated successfully',
  };
};
