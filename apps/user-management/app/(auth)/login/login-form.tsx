'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input } from '@repo/shared/nextui';
import { toast } from '@repo/shared/sonner';

import { login } from '@/actions/login';

const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const result = await login(data.email, data.password);

    switch (result.status) {
      case 'success':
        toast.success(result.message);
        router.push('/conference');
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
