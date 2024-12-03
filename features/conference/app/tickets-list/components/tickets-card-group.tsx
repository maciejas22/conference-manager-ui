import { type ComponentProps } from 'react';

import { Ticket } from './tickets-card';

type TicketGroupProps = {
  tickets: ComponentProps<typeof Ticket>[];
};

export function TicketGroup({ tickets }: TicketGroupProps) {
  return (
    <div className="space-y-8" role="list">
      {tickets.map((ticket) => (
        <Ticket key={ticket.ticketNumber} {...ticket} />
      ))}
    </div>
  );
}
