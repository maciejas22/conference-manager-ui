'use server';

import { createClient } from '@repo/shared/supabase/client';

import { type FormStatus } from '#types/form-status';

interface ChangePasswordResponse {
  status: FormStatus;
  message: string;
}

export const changePasswordAction = async (
  newPassword: string,
): Promise<ChangePasswordResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return error
    ? { status: 'error', message: error.message }
    : { status: 'success', message: 'Password changed successfully' };
};
