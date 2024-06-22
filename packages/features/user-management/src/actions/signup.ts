'use server';

import { createClient } from '@repo/libs/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface SignupFormState {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

const registerSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

export async function signup(_formState: SignupFormState, formData: FormData) {
  const supabase = createClient();

  const validatedData = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }

  console.log(validatedData.data);
  const { error } = await supabase.auth.signUp(validatedData.data);

  if (error) {
    console.error(error);
    return {
      errors: {
        email: ['Invalid email or password'],
        password: ['Invalid email or password'],
      },
      message: 'Signup failed',
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
