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
  params: Promise<{ id: string }>;
}) {
  const conferenceId = await params.then((p) => Number(p.id));
  const conferenceData = await serverFetcher({
    document: getConferenceFormInitialDataQuery,
    variables: { id: conferenceId },
  });

  return (
    <ConferenceForm operation="edit" initialData={conferenceData.conference} />
  );
}
