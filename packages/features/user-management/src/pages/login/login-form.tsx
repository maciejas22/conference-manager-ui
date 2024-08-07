'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button, Input } from '@repo/shared/nextui';
import { navigate } from '@repo/shared/utils';

import { login } from '#actions/login';

const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

function LoginForm() {
  const { register, handleSubmit, formState, setError } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const result = await login(data);

    switch (result.status) {
      case 'success':
        toast.success(result.message);
        navigate('/');
        break;

      case 'error':
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            errors.forEach((error) => {
              setError(field as keyof LoginSchema, { message: error });
            });
          });
        }
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

export { LoginForm };
