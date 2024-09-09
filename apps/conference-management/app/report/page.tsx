import { type Metadata } from 'next';

import { ConferencesTable } from './conferences-table';
import { OrganizerMetrics } from './organizer-metrics';
import { ParticipantsChart } from './participants-chart';

export const metadata: Metadata = {
  title: 'Reporting | Conference Manager',
};
export default function ReportingPage() {
  return (
    <>
      <OrganizerMetrics />
      <ParticipantsChart />
      <ConferencesTable />
    </>
  );
}
