'use server';

import { z } from 'zod';

import { createClient } from '@repo/shared/supabase/client';

const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

type LoginInput = z.infer<typeof loginSchema>;

type FieldErrors = Partial<Record<keyof LoginInput, string[]>>;
interface LoginResult {
  fieldErrors?: FieldErrors;
  message?: string;
  status: 'success' | 'error';
}

export async function login(formData: LoginInput): Promise<LoginResult> {
  const supabase = createClient();

  const validatedData = loginSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      fieldErrors: validatedData.error.flatten().fieldErrors,
      status: 'error',
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    if (error.message === 'Invalid login credentials')
      return {
        fieldErrors: {
          email: ['Invalid email or password'],
          password: ['Invalid email or password'],
        },
        message: error.message,
        status: 'error',
      };

    return {
      message: error.message,
      status: 'error',
    };
  }

  return {
    message: 'Login successful',
    status: 'success',
  };
}
