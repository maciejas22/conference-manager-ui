import { type Metadata } from 'next';

import { ConferenceForm } from '@/features/conference/app/form';

export const metadata: Metadata = {
  title: 'Create Conference | Conference Manager',
};

export default function CreateConferencePage() {
  return <ConferenceForm operation="create" />;
}
