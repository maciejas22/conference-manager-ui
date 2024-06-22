import { graphql } from '@/lib/graphql';

export default graphql(`
  query GetConference($id: ID!) {
    conference(id: $id) {
      id
      title
      date
      location
      additionalInfo
      participantsCount
      participantsLimit
      registrationDeadline
    }
  }
`);
