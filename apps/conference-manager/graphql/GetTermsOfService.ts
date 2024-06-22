import { graphql } from '@/lib/graphql';

export default graphql(`
  query GetTermsOfService {
    termsAndConditions {
      id
      introduction
      acknowledgement
      lastUpdated
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
