import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  getAgendaQueryOptions,
  getConferenceQueryOptions,
} from "@/services/conference/queries";

import ConferenceActions from "../_components/conference-actions";
import AgendaTimeline from "./_components/agenda-timeline";
import { ConferenceDetails } from "./_components/conference-details";

export default async function ConferencePage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getConferenceQueryOptions(params.id));
  await queryClient.prefetchQuery(getAgendaQueryOptions(params.id));

  return (
    <div className="space-y-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ConferenceDetails
          conferenceActions={<ConferenceActions conferenceId={params.id} />}
        />
        <AgendaTimeline />
      </HydrationBoundary>
    </div>
  );
}
