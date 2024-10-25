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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleJoin = async () => {
    setLoading(true);
    joinConferenceAction(conferenceId)
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(clientSecret);
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

  const handleClose = () => {
    onClose();
    setClientSecret('');
    setLoading(false);
  };

  return (
    <>
      <Button color="primary" onPress={handleJoin} isLoading={loading}>
        Join conference
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          <StripeProvider
            options={{
              clientSecret,
            }}
          >
            <PaymentForm conferenceId={conferenceId} />
          </StripeProvider>
        </ModalContent>
      </Modal>
    </>
  );
}
