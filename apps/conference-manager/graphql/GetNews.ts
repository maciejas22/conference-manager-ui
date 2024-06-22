import { graphql } from "@/lib/graphql";

export default graphql(`
  query GetNews {
    news {
      id
      title
      content
      date
    }
  }
`);
