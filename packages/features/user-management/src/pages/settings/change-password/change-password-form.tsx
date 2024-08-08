'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button, Input } from '@repo/shared/nextui';

import { changePasswordAction } from '#actions/change-password';

import { Footer } from '../components/footer';

const changePasswordSchema = z
  .object({
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const { register, handleSubmit, formState } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    const result = await changePasswordAction(data.newPassword);

    switch (result.status) {
      case 'success':
        toast.success(result.message);
        break;

      case 'error':
        toast.error(result.message);
        break;
    }
  };

  return (
    <form className=" um-space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="New Password"
        isRequired
        type="password"
        isInvalid={Boolean(formState.errors.newPassword)}
        errorMessage={formState.errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Input
        label="Confirm Password"
        isRequired
        type="password"
        isInvalid={Boolean(formState.errors.confirmPassword)}
        errorMessage={formState.errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Footer>
        <Button
          color="primary"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Save
        </Button>
      </Footer>
    </form>
  );
}
