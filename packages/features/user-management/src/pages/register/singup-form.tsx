'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button, Input, Radio, RadioGroup } from '@repo/shared/nextui';
import { navigate } from '@repo/shared/utils';

import { signup } from '#actions/signup';
import { type Role } from '#types/role';

interface RoleOption {
  value: Role;
  label: string;
  description: string;
}

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
  const { register, handleSubmit, formState } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const result = await signup(data.email, data.password, data.role);

    switch (result.status) {
      case 'success':
        toast.success(result.message);
        navigate('/auth/login');
        break;

      case 'error':
        toast.error(result.message);
        break;
    }
  };

  return (
    <form className="um-mt-10 um-space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
      <RadioGroup
        label="Role"
        color="primary"
        isRequired
        isInvalid={Boolean(formState.errors.role)}
        errorMessage={formState.errors.role?.message}
        {...register('role')}
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

      <Button
        type="submit"
        isLoading={formState.isSubmitting}
        color="primary"
        fullWidth
      >
        Login
      </Button>
    </form>
  );
}

export { RegisterForm };
