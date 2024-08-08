'use server';

import { createClient } from '@repo/shared/supabase/client';

import { type FormStatus } from '#types/form-status';

interface SignupResponse {
  status: FormStatus;
  message: string;
}
export async function signup(
  email: string,
  password: string,
  role: string,
): Promise<SignupResponse> {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  });

  return error
    ? { status: 'error', message: error.message }
    : { status: 'success', message: 'Signup successful' };
}
