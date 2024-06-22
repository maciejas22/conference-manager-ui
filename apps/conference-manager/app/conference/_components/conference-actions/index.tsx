import { QueryClient } from "@tanstack/react-query";

import ParticipantActions from "@/app/conference/_components/conference-actions/participant-actions";

import { getUserQueryOptions } from "@/services/user/queries";

import OrganizerActions from "./organizer-actions";

interface ConferenceActionsProps {
  conferenceId: string;
}

export default async function ConferenceActions({
  conferenceId,
}: ConferenceActionsProps) {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery(getUserQueryOptions());
  const user = data?.user;

  if (!user) {
    return null;
  }

  return (
    <>
      {user.role === "Participant" && (
        <ParticipantActions conferenceId={conferenceId} />
      )}
      {user.role === "Organizer" && (
        <OrganizerActions conferenceId={conferenceId} />
      )}
    </>
  );
}
