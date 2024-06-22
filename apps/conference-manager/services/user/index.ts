import { getGqlClient } from "@/lib/graphql-client";

import { Role, UpdateUserInput } from "@/graphql/__types__/types";

import GET_USER_QUERY from "@/graphql/GetUser";
import IS_ORGANIZER from "@/graphql/IsOrganizer";
import IS_PARTICIPANT from "@/graphql/IsParticipant";
import LOGIN_USER_MUTATION from "@/graphql/LoginUser";
import REGISTER_USER_MUTATION from "@/graphql/RegisterUser";
import UPDATE_PASSWORD_MUTATION from "@/graphql/UpdatePassword";
import UPDATE_USER_MUTATION from "@/graphql/UpdateUser";

async function getUser() {
  const gqlClient = getGqlClient();
  return gqlClient?.request(GET_USER_QUERY);
}

async function isParticipantQuery(conferenceId: string) {
  const gqlClient = getGqlClient();
  return gqlClient?.request(IS_PARTICIPANT, {
    conferenceID: conferenceId,
  });
}

async function isOrganizerQuery(conferenceId: string) {
  const gqlClient = getGqlClient();

  return gqlClient?.request(IS_ORGANIZER, {
    conferenceID: conferenceId,
  });
}

async function loginUserQuery(username: string, password: string) {
  const gqlClient = getGqlClient();

  return gqlClient?.request(LOGIN_USER_MUTATION, {
    input: {
      username,
      password,
    },
  });
}

async function registerUserQuery(
  username: string,
  password: string,
  email: string,
  role: Role,
) {
  const gqlClient = getGqlClient();

  return gqlClient.request(REGISTER_USER_MUTATION, {
    input: {
      username,
      email,
      password,
      role,
    },
  });
}

async function updateUserMutation(userData: UpdateUserInput) {
  const gqlClient = getGqlClient();
  return gqlClient.request(UPDATE_USER_MUTATION, {
    updateUserInput: userData,
  });
}

async function updateUserPasswordMutation(
  currentPassword: string,
  newPassword: string,
) {
  const gqlClient = getGqlClient();
  return gqlClient.request(UPDATE_PASSWORD_MUTATION, {
    updatePasswordInput: {
      currentPassword,
      newPassword,
    },
  });
}

export {
  getUser,
  isParticipantQuery,
  isOrganizerQuery,
  loginUserQuery,
  registerUserQuery,
  updateUserMutation,
  updateUserPasswordMutation,
};
