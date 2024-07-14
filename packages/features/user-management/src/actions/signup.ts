'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { nanoid } from 'nanoid';
import { z } from 'zod';

import { createClient } from '@repo/libs/supabase/client';

export interface SignupFormState {
  errors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    role?: string[];
  };
  message?: {
    id: string;
    text: string;
  };
}
const registerSchema = z
  .object({
    email: z.string().email().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.union([z.literal('Organizer'), z.literal('Participant')]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['newPassword'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export async function signup(_formState: SignupFormState, formData: FormData) {
  const supabase = createClient();

  const validatedData = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    role: formData.get('role'),
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

  const { error } = await supabase.auth.signUp({
    email: validatedData.data.email,
    password: validatedData.data.password,
    options: {
      data: {
        role: validatedData.data.role,
      },
    },
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return {
      errors: {},
      message: {
        id: nanoid(),
        text: 'Signup failed',
      },
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
