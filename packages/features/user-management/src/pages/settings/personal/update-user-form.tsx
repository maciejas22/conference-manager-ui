'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Card } from '@repo/shared/components';
import { FormLayout } from '@repo/shared/layouts';
import { Button, Input } from '@repo/shared/nextui';

import { modifyUserDataAction } from '#actions/modify-user-data';

const updateUserDataSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  username: z.string().min(6),
  email: z.string().email(),
});

type UpdateUserDataSchema = z.infer<typeof updateUserDataSchema>;

export function UpdateUserForm({
  name,
  surname,
  username,
  email,
}: UpdateUserDataSchema) {
  const { register, handleSubmit, formState } = useForm<UpdateUserDataSchema>({
    resolver: zodResolver(updateUserDataSchema),
  });

  const onSubmit: SubmitHandler<UpdateUserDataSchema> = async (data) => {
    const result = await modifyUserDataAction(
      data.name ?? '',
      data.surname ?? '',
      data.username,
      data.email,
    );

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
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <FormLayout
        footerChildren={
          <Button
            type="submit"
            color="primary"
            isLoading={formState.isSubmitting}
          >
            Save
          </Button>
        }
      >
        <Card header="Update User">
          <Input
            label="Name"
            defaultValue={name}
            isInvalid={Boolean(formState.errors.name)}
            errorMessage={formState.errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Surname"
            defaultValue={surname}
            isInvalid={Boolean(formState.errors.surname)}
            errorMessage={formState.errors.surname?.message}
            {...register('surname')}
          />
          <Input
            label="Username"
            isRequired
            defaultValue={username}
            isInvalid={Boolean(formState.errors.username)}
            errorMessage={formState.errors.username?.message}
            {...register('username')}
          />
          <Input
            label="Email"
            isRequired
            defaultValue={email}
            type="email"
            isInvalid={Boolean(formState.errors.email)}
            errorMessage={formState.errors.email?.message}
            {...register('email')}
          />
        </Card>
      </FormLayout>
    </form>
  );
}
