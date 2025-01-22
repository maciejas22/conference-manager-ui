import {
  ConferenceFiles,
  conferenceFilesFragment,
} from '@/features/conference/app/details/conference-files';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

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

export default async function Files({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const conferenceIdParam = await params.then((p) => Number(p.id));
  const conferenceData = await serverFetcher({
    document: getConferenceFilesQuery,
    variables: { id: conferenceIdParam },
  });
  const conference = conferenceData.conference;

  return <ConferenceFiles data={conference} />;
}
