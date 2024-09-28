import { Header } from '@/components';
import {
  ConferenceFiles,
  conferenceFilesFragment,
} from '@/features/conference/app/details/conference-files';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getConferenceFilesQuery = graphql(
  `
    query GetConferenceFiles($id: ID!) {
      conference(id: $id) {
        ...ConferenceFilesFragment
      }
    }
  `,
  [conferenceFilesFragment],
);

export default async function Files({ params }: { params: { id: string } }) {
  const conferenceData = await serverFetcher({
    document: getConferenceFilesQuery,
    variables: { id: Number(params.id) },
  });
  const conference = conferenceData.conference;

  return (
    <div className="space-y-8">
      <Header className="text-3xl">Attachments</Header>
      <ConferenceFiles data={conference} />
    </div>
  );
}
