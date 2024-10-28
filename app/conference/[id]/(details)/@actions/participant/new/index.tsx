'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal';
import { toast } from 'sonner';

import {
  joinConferenceAction,
  PaymentForm,
} from '@/features/conference/app/join-conference';
import { StripeProvider } from '@/libs/stripe/provider';
import { FormStatus } from '@/types/response';

type UnassociatedParticipantActionsProps = {
  conferenceId: number;
};

export function UnassociatedParticipantActions({
  conferenceId,
}: UnassociatedParticipantActionsProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const handleJoin = async () => {
    setLoading(true);
    joinConferenceAction(conferenceId)
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data?.clientSecret);
          onOpen();
          return;
        }

        switch (data.status) {
          case FormStatus.Success:
            toast.success(data.message);
            break;
          case FormStatus.Error:
            toast.error(data.message);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <StripeProvider
      options={{
        mode: 'payment',
        currency: 'usd',
        amount: 1000,
      }}
    >
      <Button color="primary" onPress={handleJoin} isLoading={loading}>
        Join conference
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          <PaymentForm
            clientSecret={clientSecret}
            conferenceId={conferenceId}
          />
        </ModalContent>
      </Modal>
    </StripeProvider>
  );
}
