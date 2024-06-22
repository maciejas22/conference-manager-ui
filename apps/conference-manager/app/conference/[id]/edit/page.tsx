import { QueryClient } from "@tanstack/react-query";

import { Header } from "@/components/header";

import {
  getAgendaQueryOptions,
  getConferenceQueryOptions,
} from "@/services/conference/queries";

import { ConferenceForm } from "../../_components/form";

export default async function ConferenceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const conference = await queryClient.fetchQuery(
    getConferenceQueryOptions(params.id),
  );
  const agenda = await queryClient.fetchQuery(getAgendaQueryOptions(params.id));

  return (
    <>
      <Header>Edit conference</Header>
      <ConferenceForm
        operation="edit"
        initialConferenceData={conference.conference}
        initialAgendaData={agenda.conference?.agenda}
      />
    </>
  );
}
