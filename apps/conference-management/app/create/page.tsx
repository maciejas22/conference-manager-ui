import { type Metadata } from 'next';

import { ConferenceForm } from '@/components/conference-form';

export const metadata: Metadata = {
  title: 'Create Conference | Conference Manager',
};

export default function CreateConferencePage() {
  return <ConferenceForm operation="create" />;
}
