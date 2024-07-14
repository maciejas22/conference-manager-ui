'use server';

import { revalidatePath } from 'next/cache';

import { nanoid } from 'nanoid';
import { z } from 'zod';

import { modifyUserData } from '#services/modify-user-data';

export interface ModifyUserDataFormState {
  errors: {
    name?: string[];
    surname?: string[];
    username?: string[];
    email?: string[];
  };
  message?: {
    id: string;
    text: string;
  };
}

const updateUserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  username: z.string().min(6, 'Username must be at least 6 characters'),
  email: z.string().email('Invalid email address'),
});

export const modifyUserDataAction = async (
  _formState: ModifyUserDataFormState,
  formData: FormData,
): Promise<ModifyUserDataFormState> => {
  const validatedFields = updateUserSchema.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    username: formData.get('username'),
    email: formData.get('email'),
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

  try {
    await modifyUserData({
      name: validatedFields.data.name,
      surname: validatedFields.data.surname,
      username: validatedFields.data.username,
      email: validatedFields.data.email,
    });
  } catch (error) {
    console.error(error);
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
      text: 'User updated successfully',
    },
  };
};
