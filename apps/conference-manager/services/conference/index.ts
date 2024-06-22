// import { getGqlClient } from "@/lib/graphql-client";
import { getGqlClient } from '@repo/libs/graphql-client'

import {
  CreateConferenceInput,
  ModifyConferenceInput,
  QueryConferencesArgs,
} from "@/graphql/__types__/types";

import ADD_USER_TO_CONFERENCE from "@/graphql/AddUserToConference";
import CREATE_CONFERENCE_MUTATION from "@/graphql/CreateConference";
import GET_AGENDA_QUERY from "@/graphql/GetAgenda";
import GET_ASSOCIATED_CONFERENCES_QUERY from "@/graphql/GetAssociatedConferences";
import GET_CONFERENCE_QUERY from "@/graphql/GetConference";
import GET_CONFERENCES_QUERY from "@/graphql/GetConferences";
import MODIFY_CONFERENCE_MUTATION from "@/graphql/ModifyConference";
import REMOVE_USER_FROM_CONFERENCE from "@/graphql/RemoveUserFromConference";


async function getConferences(vars: QueryConferencesArgs) {
  const gqlClient = getGqlClient();
  return gqlClient.request(GET_CONFERENCES_QUERY, {
    ...vars,
  });
}

async function getConference(id: string) {
  const gqlClient = getGqlClient();
  return gqlClient.request(GET_CONFERENCE_QUERY, {
    id,
  });
}

async function getAgenda(id: string) {
  const gqlClient = getGqlClient();
  return gqlClient.request(GET_AGENDA_QUERY, {
    id,
  });
}

async function createConference(input: CreateConferenceInput) {
  const gqlClient = getGqlClient();
  return gqlClient.request(CREATE_CONFERENCE_MUTATION, {
    createConferenceInput: input,
  });
}

async function joinConference(conferenceId: string) {
  const gqlClient = getGqlClient();
  return gqlClient.request(ADD_USER_TO_CONFERENCE, {
    conferenceId,
  });
}

async function leaveConference(conferenceId: string) {
  const gqlClient = getGqlClient();
  return gqlClient.request(REMOVE_USER_FROM_CONFERENCE, { conferenceId });
}

async function getAssociatedConferences() {
  const gqlClient = getGqlClient();
  return gqlClient.request(GET_ASSOCIATED_CONFERENCES_QUERY);
}

async function modifyConference(conference: ModifyConferenceInput) {
  const gqlClient = getGqlClient();
  return gqlClient.request(MODIFY_CONFERENCE_MUTATION, {
    input: conference,
  });
}

export {
  getConferences,
  getConference,
  createConference,
  joinConference,
  leaveConference,
  getAssociatedConferences,
  modifyConference,
  getAgenda,
};
