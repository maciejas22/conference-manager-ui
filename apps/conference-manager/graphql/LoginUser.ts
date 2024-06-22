import { graphql } from '@/lib/graphql';

export default graphql(`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(loginUserInput: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`);
