import { graphql } from '@repo/libs/graphql';

export const getTermsOfServiceQuery = graphql(`
  query GetTermsOfService {
    termsAndConditions {
      id
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
  }
`);
