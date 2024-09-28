import { FileList } from '@/features/conference/components/file-list';
import { FragmentOf, readFragment } from '@/libs/graphql';

import { conferenceFilesFragment } from './conference-files-fragment';

type ConferenceFilesProps = {
  data: FragmentOf<typeof conferenceFilesFragment>;
};

async function ConferenceFiles({ data }: ConferenceFilesProps) {
  const filesData = readFragment(conferenceFilesFragment, data);

  return (
    <FileList
      mode="view"
      attachments={filesData.files.map((f) => ({ file: f }))}
    />
  );
}

export { ConferenceFiles, conferenceFilesFragment };
