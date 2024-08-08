'use server';

import { modifyUserData } from '#services/modify-user-data';
import { type FormStatus } from '#types/form-status';

interface ModifyUserDataResponse {
  status: FormStatus;
  message: string;
}

export const modifyUserDataAction = async (
  name: string,
  surname: string,
  username: string,
  email: string,
): Promise<ModifyUserDataResponse> => {
  try {
    await modifyUserData({
      name,
      surname,
      username,
      email,
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
