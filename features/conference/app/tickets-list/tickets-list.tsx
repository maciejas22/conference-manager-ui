'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Pagination } from '@/components/pagination';
import { FragmentOf, readFragment } from '@/libs/graphql';

import { TicketGroup } from './components/tickets-card-group';
import { getUserTicketsFragment } from './get-tickets-list-fragment';

type TicketsListProps = {
  data: FragmentOf<typeof getUserTicketsFragment>;
};

const getPaginationQueryString = ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', pageNumber.toString());
  searchParams.set('pageSize', pageSize.toString());
  return searchParams.toString();
};

export function TicketsList({ data }: TicketsListProps) {
  const ticketsData = readFragment(getUserTicketsFragment, data);
  console.log(ticketsData.tickets.meta);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-12">
      <TicketGroup
        tickets={ticketsData.tickets.data.map((ticket) => ({
          conferenceId: ticket.conference.id,
          conferenceName: ticket.conference.title,
          conferenceStartDate: ticket.conference.startDate,
          conferenceEndDate: ticket.conference.endDate,
          ticketNumber: ticket.id,
        }))}
      />
      <Pagination
        totalItems={ticketsData.tickets.meta.totalItems}
        currentPage={ticketsData.tickets.meta.number}
        pageSize={ticketsData.tickets.meta.size}
        onPageUpdate={({ page, pageSize }) => {
          router.push(
            pathname +
              '?' +
              getPaginationQueryString({ pageNumber: page, pageSize }),
          );
        }}
      />
    </div>
  );
}
