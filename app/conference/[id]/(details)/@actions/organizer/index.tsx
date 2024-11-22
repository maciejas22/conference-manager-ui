'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';

import { Alert } from '@/components/alert';
import { graphql } from '@/libs/graphql';
import { clientFetcher } from '@/utils/fetchers/client-fetcher';

const validateTicketMutation = graphql(`
  mutation ValidateTicket($validateTicketInput: ValidateTicketInput!) {
    validateTicket(input: $validateTicketInput)
  }
`);

type OrganizerActionsProps = {
  conferenceId: number;
};

export function OrganizerActions({ conferenceId }: OrganizerActionsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ticketId, setTicketId] = useState('');
  const [isValidatingTicket, setIsValidatingTicket] = useState(false);
  const [isTicketValid, setIsTicketValid] = useState<boolean | undefined>();

  const validateTicket = async () => {
    setIsValidatingTicket(true);
    setIsTicketValid(undefined);

    clientFetcher({
      document: validateTicketMutation,
      variables: {
        validateTicketInput: {
          ticketId,
          conferenceId,
        },
      },
    })
      .then((res) => {
        setIsTicketValid(res.validateTicket);
      })
      .catch(() => {
        setIsTicketValid(false);
      })
      .finally(() => {
        setIsValidatingTicket(false);
      });
  };

  return (
    <div className="space-x-2">
      <Button onPress={onOpen} color="primary">
        Validate Ticket
      </Button>
      <Button
        as={Link}
        href={`/conference/${conferenceId.toString()}/edit`}
        color="primary"
      >
        Edit conference
      </Button>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Validate Ticket
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Ticket Id"
              value={ticketId}
              onValueChange={(v) => setTicketId(v)}
            />
            {isTicketValid !== undefined && (
              <Alert
                type={isTicketValid ? 'success' : 'error'}
                title={isTicketValid ? 'Ticket is valid' : 'Ticket is invalid'}
                message={
                  isTicketValid
                    ? 'The ticket is valid and can be used to enter the conference.'
                    : 'The ticket is invalid. Please check the ticket ID and try again.'
                }
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={validateTicket}
              isLoading={isValidatingTicket}
            >
              Validate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
