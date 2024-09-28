'use server';

import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getTermsOfServiceQuery = graphql(`
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

export const getTermsOfService = () =>
  serverFetcher({ document: getTermsOfServiceQuery });
