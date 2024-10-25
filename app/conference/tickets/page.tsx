import { type Metadata } from 'next';

import { z } from 'zod';

import {
  getUserTicketsFragment,
  TicketsList,
} from '@/features/conference/app/tickets-list';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

export const metadata: Metadata = {
  title: 'Tickets | Conference Manager',
};

const getUserTicketsQuery = graphql(
  `
    query UserTicketsPage($page: Page!) {
      user {
        ...UserTickets
      }
    }
  `,
  [getUserTicketsFragment],
);

const paginationSchema = z.object({
  page: z
    .string()
    .transform((pageString) => Number(pageString))
    .catch(() => 1),
  pageSize: z
    .string()
    .transform((pageSizeString) => Number(pageSizeString))
    .catch(() => 10),
});

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const { page, pageSize } = paginationSchema.parse(searchParams);
  const ticketsData = await serverFetcher({
    document: getUserTicketsQuery,
    variables: { page: { number: page, size: pageSize } },
  });
  if (!ticketsData.user) {
    throw new Error('Failed to fetch user tickets');
  }

  return <TicketsList data={ticketsData.user} />;
}
