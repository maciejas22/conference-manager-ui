import { graphql } from "@/lib/graphql";

export default graphql(`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(registerUserInput: $input) {
      id
      name
      surname
      username
      email
      role
    }
  }
`);
