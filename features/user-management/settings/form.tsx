'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Card } from '@/components/card';
import { FormLayout } from '@/layouts/form-layout';
import { FormStatus } from '@/types/response';

import { updateUser } from './action';

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
    const result = await updateUser({
      username: data.username,
      name: data.name ?? '',
      surname: data.surname ?? '',
      email: data.email,
    });

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
