'use client';

import { useFormState } from 'react-dom';

import { SubmitButton } from '@repo/components';

import { isParticipant as isParticipantOfConference } from '#actions/is-participant';
import { joinConferenceAction as joinConference } from '#actions/join-conference';
import { leaveConferenceAction as leaveConference } from '#actions/leave-conference';

interface ParticipantActionsProps {
  conferenceId: string;
}

export async function ParticipantActions({
  conferenceId,
}: ParticipantActionsProps) {
  const data = await isParticipantOfConference(conferenceId);
  const joinConferenceAction = joinConference.bind(null, conferenceId);
  const leaveConferenceAction = leaveConference.bind(null, conferenceId);
  const action = data.isParticipant
    ? leaveConferenceAction
    : joinConferenceAction;
  const [_state, formAction] = useFormState(action, {});

  return (
    <form action={formAction}>
      <SubmitButton>
        {data.isParticipant ? 'Leave conference' : 'Join conference'}
      </SubmitButton>
    </form>
  );
}
