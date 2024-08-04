import { graphql } from '@repo/shared/graphql';

export const getNewsQuery = graphql(`
  query GetNews {
    news {
      id
      title
      content
      date
    }
  }
`);
