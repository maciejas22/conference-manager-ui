import { Header } from '@repo/components';

import { ConferenceForm } from '../components/conference-form';

export function CreateConferencePage() {
  return (
    <>
      <Header>Create conference</Header>
      <ConferenceForm operation="create" />
    </>
  );
}
