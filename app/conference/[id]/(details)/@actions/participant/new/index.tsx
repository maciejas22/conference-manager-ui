'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal';

import { StripeProvider } from '@/libs/stripe/provider';

import { PaymentForm } from './payment-form';

type UnassociatedParticipantActionsProps = {
  conferenceId: number;
};

export function UnassociatedParticipantActions({
  conferenceId,
}: UnassociatedParticipantActionsProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onModalClose = () => {
    onClose();
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Join conference
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        onClose={onModalClose}
        isDismissable={false}
      >
        <ModalContent>
          <StripeProvider
            options={{
              mode: 'payment',
              currency: 'usd',
              amount: 1000,
            }}
          >
            <PaymentForm conferenceId={conferenceId} />
          </StripeProvider>
        </ModalContent>
      </Modal>
    </>
  );
}
