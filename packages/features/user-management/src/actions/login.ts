'use server';

import { createServerClient } from '@repo/libs/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

export async function login(_formState: LoginFormState, formData: FormData) {
  const supabase = createServerClient();

  const validatedData = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    return {
      errors: {
        email: ['Invalid email or password'],
        password: ['Invalid email or password'],
      },
      message: 'Login failed',
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
