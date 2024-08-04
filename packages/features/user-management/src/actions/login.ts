'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { nanoid } from 'nanoid';
import { z } from 'zod';

import { createClient } from '@repo/shared/supabase/client';

export interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: {
    id: string;
    text: string;
  };
}

const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

export async function login(_formState: LoginFormState, formData: FormData) {
  const supabase = createClient();

  const validatedData = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: {
        id: nanoid(),
        text: 'Validation failed',
      },
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    return {
      errors: {
        email: ['Invalid email or password'],
        password: ['Invalid email or password'],
      },
      message: {
        id: nanoid(),
        text: 'Login failed',
      },
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
