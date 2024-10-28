import { parseAbsoluteToLocal } from '@internationalized/date';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import QRCode from 'react-qr-code';

import { Card } from '@/components/card';
import { Subtext } from '@/components/subtext';
import { getFormattedDateTime } from '@/utils/formatters/date-formatter';

type TicketProps = {
  conferenceId: number;
  conferenceName: string;
  conferenceStartDate: string;
  conferenceEndDate: string;
  ticketNumber: string;
};

export function Ticket({
  conferenceId,
  conferenceName,
  conferenceStartDate,
  conferenceEndDate,
  ticketNumber,
}: TicketProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formattedStartDate = getFormattedDateTime(
    parseAbsoluteToLocal(conferenceStartDate),
  );
  const formattedEndDate = getFormattedDateTime(
    parseAbsoluteToLocal(conferenceEndDate),
  );

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/conference/${conferenceId}`} className="text-2xl">
            {conferenceName}
          </Link>
          <Subtext>{`${formattedStartDate} - ${formattedEndDate}`}</Subtext>
        </div>
        <button onClick={onOpen}>
          <QRCode
            size={68}
            value={ticketNumber}
            bgColor="#18181A"
            fgColor="#FFFFFF"
          />
        </button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {conferenceName}
                </ModalHeader>
                <ModalBody className="flex w-full items-center">
                  <QRCode
                    size={256}
                    value={ticketNumber}
                    bgColor="#18181A"
                    fgColor="#FFFFFF"
                  />
                  <p>{ticketNumber}</p>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Card>
  );
}
