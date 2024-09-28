import {
  ConferenceDetails,
  conferenceDetailsFragment,
} from '@/features/conference/app/details/conference-details';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

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
  params: { id: string };
}) {
  const conferenceData = await serverFetcher({
    document: getConferenceDetailsQuery,
    variables: { id: Number(params.id) },
  });
  const conference = conferenceData.conference;

  return <ConferenceDetails data={conference} />;
}
