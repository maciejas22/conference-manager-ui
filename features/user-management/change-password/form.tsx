'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Card } from '@/components';
import { FormLayout } from '@/layouts';
import { FormStatus } from '@/types/response';

import { changePassword } from './action';

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
    const result = await changePassword(data.newPassword);

    switch (result.status) {
      case FormStatus.Success:
        toast.success(result.message);
        break;

      case FormStatus.Error:
        toast.error(result.message);
        break;
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <FormLayout
        footerChildren={
          <Button
            color="primary"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Save
          </Button>
        }
      >
        <Card header="Change password">
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
        </Card>
      </FormLayout>
    </form>
  );
}
