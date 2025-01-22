'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormStatus } from '@/types/response';

import { signup } from './action';

type RoleOption = {
  value: RegisterSchema['role'];
  label: string;
  description: string;
};

const roles: RoleOption[] = [
  {
    value: 'Participant',
    label: 'Participant',
    description: 'Join events',
  },
  {
    value: 'Organizer',
    label: 'Organizer',
    description: 'Create and manage events',
  },
];

const registerSchema = z
  .object({
    email: z.string().email().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.enum(['Participant', 'Organizer']),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
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

type RegisterSchema = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const { control, register, handleSubmit, formState } =
    useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
    });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const result = await signup({
      email: data.email,
      password: data.password,
      role: data.role,
    });

    switch (result.status) {
      case FormStatus.Success:
        toast.success(result.message);
        router.push('/user/login');
        break;

      case FormStatus.Error:
        toast.error(result.message);
        break;
    }
  };

  return (
    <form
      className="mt-10 space-y-6"
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <Input
        type="email"
        label="Email"
        isRequired
        isInvalid={Boolean(formState.errors.email)}
        errorMessage={formState.errors.email?.message}
        {...register('email')}
      />
      <Input
        type="password"
        label="Password"
        isRequired
        isInvalid={Boolean(formState.errors.password)}
        errorMessage={formState.errors.password?.message}
        {...register('password')}
      />
      <Input
        type="password"
        label="Confirm Password"
        isRequired
        isInvalid={Boolean(formState.errors.confirmPassword)}
        errorMessage={formState.errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="Role"
            color="primary"
            isRequired
            isInvalid={Boolean(formState.errors.role)}
            errorMessage={formState.errors.role?.message}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            {roles.map((role) => (
              <Radio
                key={role.value}
                value={role.value}
                description={role.description}
              >
                {role.label}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />

      <Button
        type="submit"
        isLoading={formState.isSubmitting}
        color="primary"
        fullWidth
      >
        Sign up
      </Button>
    </form>
  );
}

export { RegisterForm };
