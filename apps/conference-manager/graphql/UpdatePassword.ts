import { graphql } from '@/lib/graphql';

export default graphql(`
  mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
    updatePassword(updatePasswordInput: $updatePasswordInput) {
      id
      username
    }
  }
`);
