'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@repo/shared/nextui';

import { joinConferenceAction as joinConference } from '#actions/join-conference';
import { leaveConferenceAction as leaveConference } from '#actions/leave-conference';
import { ResponseStatus } from '#types/response';

type ParticipantActionsProps = {
  conferenceId: string;
  isParticipant: boolean;
};

export function ParticipantActions({
  conferenceId,
  isParticipant,
}: ParticipantActionsProps) {
  const [pending, setPending] = useState(false);
  const action = isParticipant ? leaveConference : joinConference;

  const handleAction = async () => {
    setPending(true);
    await action(conferenceId)
      .then((res) => {
        res.status === ResponseStatus.Success
          ? toast.success(res.message)
          : toast.error(res.message);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Button
      color="primary"
      isLoading={pending}
      onClick={() => void handleAction()}
    >
      {isParticipant ? 'Leave conference' : 'Join conference'}
    </Button>
  );
}
