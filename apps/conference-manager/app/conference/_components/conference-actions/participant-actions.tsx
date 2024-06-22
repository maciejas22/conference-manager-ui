import { SubmitButton } from "@/components/submit-button";

import {
  joinConferenceAction as joinConference,
  leaveConferenceAction as leaveConference,
} from "@/actions/conference";
import { isParticipantOfConference } from "@/actions/user";

interface ParticipantActionsProps {
  conferenceId: string;
}

export default async function ParticipantActions({
  conferenceId,
}: ParticipantActionsProps) {
  const isParticipant = await isParticipantOfConference(conferenceId);
  const joinConferenceAction = joinConference.bind(null, conferenceId);
  const leaveConferenceAction = leaveConference.bind(null, conferenceId);

  return isParticipant ? (
    <form action={leaveConferenceAction}>
      <SubmitButton>Leave conference</SubmitButton>
    </form>
  ) : (
    <form action={joinConferenceAction}>
      <SubmitButton>Join conference</SubmitButton>
    </form>
  );
}
