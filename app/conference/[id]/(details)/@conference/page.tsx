import {
  ConferenceDetails,
  conferenceDetailsFragment,
} from '@/features/conference/app/details/conference-details';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getConferenceDetailsQuery = graphql(
  `
    query GetConferenceDetails($id: ID!) {
      conference(id: $id) {
        ...ConferenceDetailsFragment
      }
    }
  `,
  [conferenceDetailsFragment],
);

export default async function Conference({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const conferenceIdParam = await params.then((p) => Number(p.id));
  const conferenceData = await serverFetcher({
    document: getConferenceDetailsQuery,
    variables: { id: conferenceIdParam },
  });
  const conference = conferenceData.conference;

  return <ConferenceDetails data={conference} />;
}
