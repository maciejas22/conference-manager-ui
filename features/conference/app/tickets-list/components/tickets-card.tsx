import { parseAbsoluteToLocal } from '@internationalized/date';
import { Link } from '@nextui-org/link';
import { useBarcode } from 'next-barcode';

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
  const formattedStartDate = getFormattedDateTime(
    parseAbsoluteToLocal(conferenceStartDate),
  );
  const formattedEndDate = getFormattedDateTime(
    parseAbsoluteToLocal(conferenceEndDate),
  );
  const { inputRef } = useBarcode({
    value: ticketNumber,
    options: {
      format: 'CODE128',
      margin: 0,
      displayValue: false,
      background: '#18181A',
      lineColor: '#fff',
      height: 68,
      width: 1,
    },
  });

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/conference/${conferenceId}`} className="text-2xl">
            {conferenceName}
          </Link>
          <Subtext>{`${formattedStartDate} - ${formattedEndDate}`}</Subtext>
        </div>
        <canvas ref={inputRef} />
      </div>
    </Card>
  );
}
