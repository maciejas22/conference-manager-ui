'use server';

import { revalidatePath } from 'next/cache';

import { nanoid } from 'nanoid';
import { z } from 'zod';

import { createClient } from '@repo/shared/supabase/client';

export interface ChangePasswordFormState {
  errors: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  };
  message?: {
    id: string;
    text: string;
  };
}

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const changePasswordAction = async (
  _formState: ChangePasswordFormState,
  formData: FormData,
): Promise<ChangePasswordFormState> => {
  const supabase = createClient();

  const validatedFields = changePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {
        id: nanoid(),
        text: 'Validation failed',
      },
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: validatedFields.data.newPassword,
  });

  if (error) {
    return {
      errors: {},
      message: {
        id: nanoid(),
        text: 'Update failed',
      },
    };
  }

  revalidatePath('/user/settings');
  return {
    errors: {},
    message: {
      id: nanoid(),
      text: 'Password changed successfully',
    },
  };
};
