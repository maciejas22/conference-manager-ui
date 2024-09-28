import { graphql } from '@/libs/graphql';

export const conferenceFormInitialDataFragment = graphql(`
  fragment ConferenceFormData on Conference {
    id
    title
    startDate
    endDate
    location
    website
    acronym
    additionalInfo
    participantsLimit
    registrationDeadline
    agenda {
      id
      startTime
      endTime
      event
      speaker
    }
    files {
      key
      size
      url
    }
  }
`);
