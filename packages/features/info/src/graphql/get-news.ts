import { graphql } from '@repo/libs/graphql';

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
