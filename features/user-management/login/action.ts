'use server';

import { cookies } from 'next/headers';

import { cookiesNames } from '@/config/cookies';
import { graphql, VariablesOf } from '@/libs/graphql';
import { FormStatus } from '@/types/response';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

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
    const cookieStore = await cookies();
    const res = await serverFetcher({
      document: loginQuery,
      variables: { loginUserInput },
    });
    cookieStore.set(cookiesNames.sessionId, res.loginUser ?? '');
  } catch {
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
