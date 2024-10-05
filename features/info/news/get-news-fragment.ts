import { graphql } from '@/libs/graphql';

export const getNewsFragment = graphql(`
  fragment NewsFragment on News {
    id
    title
    content
    date
  }
`);
