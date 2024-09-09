'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, Radio, RadioGroup } from '@repo/shared/nextui';
import { toast } from '@repo/shared/sonner';

import { signup } from '@/actions/signup';
import { type Role } from '@/types/role';

type RoleOption = {
  value: Role;
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
    const result = await signup(data.email, data.password, data.role);

    switch (result.status) {
      case 'success':
        toast.success(result.message);
        router.push('/login');
        break;

      case 'error':
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
