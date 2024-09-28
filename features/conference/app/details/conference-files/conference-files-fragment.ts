import { graphql } from '@/libs/graphql';

export const conferenceFilesFragment = graphql(`
  fragment ConferenceFilesFragment on Conference {
    files {
      key
      size
      url
    }
  }
`);
