'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { toast } from 'sonner';

import { FormStatus } from '@/types/response';

import { leaveConferenceAction } from './leave-conference';

type AssociatedParticipantActionsProps = {
  conferenceId: number;
};

export function AssociatedParticipantActions({
  conferenceId,
}: AssociatedParticipantActionsProps) {
  const [pending, setPending] = useState(false);

  const handleAction = async () => {
    setPending(true);
    await leaveConferenceAction(conferenceId)
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
      Leave conference
    </Button>
  );
}
