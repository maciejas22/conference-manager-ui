import { Header, SubHeader } from '@repo/components';

import { ConferenceForm } from '../components/conference-form';

export function CreateConferencePage() {
  return (
    <>
      <Header>Create conference</Header>
      <SubHeader>Fill out the details for your new conference</SubHeader>
      <ConferenceForm operation="create" />
    </>
  );
}
