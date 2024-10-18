'use server';

import { graphql, VariablesOf } from '@/libs/graphql';
import { FormStatus } from '@/types/response';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const signupQuery = graphql(`
  mutation Register($registerUserInput: RegisterUserInput!) {
    registerUser(registerUserInput: $registerUserInput)
  }
`);

type SignupResponse = {
  status: FormStatus;
  message: string;
};

export async function signup(
  registerUserInput: VariablesOf<typeof signupQuery>['registerUserInput'],
): Promise<SignupResponse> {
  try {
    await serverFetcher({
      document: signupQuery,
      variables: { registerUserInput },
    });
  } catch (err) {
    return {
      status: FormStatus.Error,
      message: 'Failed to signup',
    };
  }

  return {
    status: FormStatus.Success,
    message: 'Signup successful',
  };
}
