'use server';

import { createClient } from '@repo/shared/supabase/server-client';

import { type FormStatus } from '@/types/form-status';

type LoginResponse = {
  status: FormStatus;
  message: string;
};

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error
    ? { status: 'error', message: error.message }
    : { status: 'success', message: 'Login successful' };
}
