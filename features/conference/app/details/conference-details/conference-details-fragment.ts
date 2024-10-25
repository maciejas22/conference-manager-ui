import { graphql } from '@/libs/graphql';

export const conferenceDetailsFragment = graphql(`
  fragment ConferenceDetailsFragment on Conference {
    title
    startDate
    endDate
    location
    website
    acronym
    additionalInfo
    participantsCount
    participantsLimit
    eventsCount
    registrationDeadline
    ticketPrice
  }
`);
