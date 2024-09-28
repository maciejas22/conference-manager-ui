'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { toast } from 'sonner';

import { FormStatus } from '@/types/response';

import { joinConferenceAction } from './_actions/join-conference';
import { leaveConferenceAction } from './_actions/leave-conference';

type ParticipantActionsProps = {
  conferenceId: number;
  isParticipant: boolean;
};

export function ParticipantActions({
  conferenceId,
  isParticipant,
}: ParticipantActionsProps) {
  const [pending, setPending] = useState(false);
  const action = isParticipant ? leaveConferenceAction : joinConferenceAction;

  const handleAction = async () => {
    setPending(true);
    await action(conferenceId)
      .then((res) => {
        res.status === FormStatus.Success
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
