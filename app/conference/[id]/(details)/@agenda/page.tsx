import {
  AgendaTimeline,
  conferenceAgendaFragment,
} from '@/features/conference/app/details/agenda-timeline';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getAgendaQuery = graphql(
  `
    query GetAgenda($id: ID!) {
      conference(id: $id) {
        ...AgendaFragment
      }
    }
  `,
  [conferenceAgendaFragment],
);

export default async function Agenda({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const conferenceIdParam = await params.then((p) => Number(p.id));
  const agendaData = await serverFetcher({
    document: getAgendaQuery,
    variables: { id: conferenceIdParam },
  });

  return <AgendaTimeline data={agendaData.conference} />;
}
