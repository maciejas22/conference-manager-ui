'use server';

import { cookies } from 'next/headers';

import { graphql, VariablesOf } from '@/libs/graphql';
import { FormStatus } from '@/types/response';
import { serverFetcher } from '@/utils/server-fetcher';

const loginQuery = graphql(`
  mutation Login($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput)
  }
`);

type LoginResponse = {
  status: FormStatus;
  message: string;
};

export async function login(
  loginUserInput: VariablesOf<typeof loginQuery>['loginUserInput'],
): Promise<LoginResponse> {
  try {
    const res = await serverFetcher({
      document: loginQuery,
      variables: { loginUserInput },
    });
    cookies().set('session', res.loginUser ?? '');
  } catch (err) {
    return {
      status: FormStatus.Error,
      message: 'Failed to login',
    };
  }

  return {
    status: FormStatus.Success,
    message: 'Login successful',
  };
}
