import { type Metadata } from 'next';

import { ConferenceForm } from '@/features/conference/app/form';
import { conferenceFormInitialDataFragment } from '@/features/conference/app/form/initial-data-fragment';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

export const metadata: Metadata = {
  title: 'Edit Conference | Conference Manager',
};

const getConferenceFormInitialDataQuery = graphql(
  `
    query GetAgenda($id: ID!) {
      conference(id: $id) {
        ...ConferenceFormData
      }
    }
  `,
  [conferenceFormInitialDataFragment],
);

export default async function ConferenceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const conferenceId = Number(params.id);
  const conferenceData = await serverFetcher({
    document: getConferenceFormInitialDataQuery,
    variables: { id: conferenceId },
  });

  return (
    <ConferenceForm operation="edit" initialData={conferenceData.conference} />
  );
}
