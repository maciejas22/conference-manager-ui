import { graphql } from '@/libs/graphql';

export const getTermsOfServiceFragment = graphql(`
  fragment TermsOfServiceFragment on TermsOfService {
    introduction
    acknowledgement
    updatedAt
    sections {
      id
      title
      content
      subsections {
        id
        title
        content
      }
    }
  }
`);
