import {
  AgendaTimeline,
  conferenceAgendaFragment,
} from '@/features/conference/app/details/agenda-timeline';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

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

export default async function Agenda({ params }: { params: { id: string } }) {
  const agendaData = await serverFetcher({
    document: getAgendaQuery,
    variables: { id: Number(params.id) },
  });

  return <AgendaTimeline data={agendaData.conference} />;
}
