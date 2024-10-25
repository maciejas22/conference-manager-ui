/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "\n  mutation UpdateSession {\n    updateSession\n  }\n":
      TadaDocumentNode<{ updateSession: string; }, {}, void>;
    "\n  query GetUser {\n    user {\n      id\n      name\n      surname\n      username\n      email\n      role\n    }\n  }\n":
      TadaDocumentNode<{ user: { id: number; name: string | null; surname: string | null; username: string | null; email: string; role: "Organizer" | "Participant"; } | null; }, {}, void>;
    "\n  mutation RemoveUserFromConference($conferenceId: ID!) {\n    removeUserFromConference(conferenceId: $conferenceId)\n  }\n":
      TadaDocumentNode<{ removeUserFromConference: number; }, { conferenceId: number; }, void>;
    "\n  mutation AddUserToConference($conferenceId: ID!) {\n    addUserToConference(conferenceId: $conferenceId)\n  }\n":
      TadaDocumentNode<{ addUserToConference: string | null; }, { conferenceId: number; }, void>;
    "\n  query GetConferences($filters: ConferencesFilters, $page: Page, $sort: Sort) {\n    conferences(filters: $filters, page: $page, sort: $sort) {\n      data {\n        id\n        title\n        acronym\n        startDate\n        endDate\n        location\n        participantsCount\n        registrationDeadline\n      }\n      meta {\n        page {\n          totalItems\n          totalPages\n        }\n      }\n    }\n  }\n":
      TadaDocumentNode<{ conferences: { data: { id: number; title: string; acronym: string | null; startDate: string; endDate: string; location: string; participantsCount: number; registrationDeadline: string | null; }[]; meta: { page: { totalItems: number; totalPages: number; }; }; }; }, { sort?: { order: "ASC" | "DESC"; column: string; } | null | undefined; page?: { size: number; number: number; } | null | undefined; filters?: { title?: string | null | undefined; runningOnly?: boolean | null | undefined; associatedOnly?: boolean | null | undefined; } | null | undefined; }, void>;
    "\n  fragment ConferenceMetrics on ConferencesMetrics {\n    runningConferences\n    startingInLessThan24Hours\n    totalConducted\n    participantsToday\n  }\n":
      TadaDocumentNode<{ runningConferences: number; startingInLessThan24Hours: number; totalConducted: number; participantsToday: number; }, {}, { fragment: "ConferenceMetrics"; on: "ConferencesMetrics"; masked: true; }>;
    "\n  fragment AgendaFragment on Conference {\n    agenda {\n      id\n      startTime\n      endTime\n      event\n      speaker\n    }\n  }\n":
      TadaDocumentNode<{ agenda: { id: number; startTime: string; endTime: string; event: string; speaker: string; }[]; }, {}, { fragment: "AgendaFragment"; on: "Conference"; masked: true; }>;
    "\n  fragment ConferenceDetailsFragment on Conference {\n    title\n    startDate\n    endDate\n    location\n    website\n    acronym\n    additionalInfo\n    participantsCount\n    participantsLimit\n    eventsCount\n    registrationDeadline\n  }\n":
      TadaDocumentNode<{ title: string; startDate: string; endDate: string; location: string; website: string | null; acronym: string | null; additionalInfo: string | null; participantsCount: number; participantsLimit: number | null; eventsCount: number; registrationDeadline: string | null; }, {}, { fragment: "ConferenceDetailsFragment"; on: "Conference"; masked: true; }>;
    "\n  fragment ConferenceFilesFragment on Conference {\n    files {\n      key\n      size\n      url\n    }\n  }\n":
      TadaDocumentNode<{ files: { key: string; size: number; url: string; }[]; }, {}, { fragment: "ConferenceFilesFragment"; on: "Conference"; masked: true; }>;
    "\n  fragment ConferenceFormData on Conference {\n    id\n    title\n    startDate\n    endDate\n    location\n    website\n    acronym\n    additionalInfo\n    participantsLimit\n    registrationDeadline\n    agenda {\n      id\n      startTime\n      endTime\n      event\n      speaker\n    }\n    files {\n      key\n      size\n      url\n    }\n  }\n":
      TadaDocumentNode<{ id: number; title: string; startDate: string; endDate: string; location: string; website: string | null; acronym: string | null; additionalInfo: string | null; participantsLimit: number | null; registrationDeadline: string | null; agenda: { id: number; startTime: string; endTime: string; event: string; speaker: string; }[]; files: { key: string; size: number; url: string; }[]; }, {}, { fragment: "ConferenceFormData"; on: "Conference"; masked: true; }>;
    "\n  mutation CreateConference($createConferenceInput: CreateConferenceInput!) {\n    createConference(createConferenceInput: $createConferenceInput)\n  }\n":
      TadaDocumentNode<{ createConference: number; }, { createConferenceInput: { ticketPrice?: number | null | undefined; files?: { uploadFile?: { base64Content: string; fileName: string; } | null | undefined; }[] | null | undefined; agenda?: { createItem?: { speaker: string; event: string; endTime: string; startTime: string; } | null | undefined; }[] | null | undefined; registrationDeadline?: string | null | undefined; participantsLimit?: number | null | undefined; additionalInfo?: string | null | undefined; acronym?: string | null | undefined; website?: string | null | undefined; location: string; endDate: string; startDate: string; title: string; }; }, void>;
    "\n  mutation ModifyConference($input: ModifyConferenceInput!) {\n    modifyConference(input: $input)\n  }\n":
      TadaDocumentNode<{ modifyConference: number; }, { input: { ticketPrice?: number | null | undefined; files?: { deleteFile?: { key: string; } | null | undefined; uploadFile?: { base64Content: string; fileName: string; } | null | undefined; }[] | null | undefined; agenda?: { deleteItem?: number | null | undefined; createItem?: { speaker: string; event: string; endTime: string; startTime: string; } | null | undefined; }[] | null | undefined; registrationDeadline?: string | null | undefined; participantsLimit?: number | null | undefined; additionalInfo?: string | null | undefined; acronym?: string | null | undefined; website?: string | null | undefined; location?: string | null | undefined; endDate?: string | null | undefined; startDate?: string | null | undefined; title?: string | null | undefined; id: number; }; }, void>;
    "\n  fragment OrganizerMetrics on OrganizerMetrics {\n    participantsCount\n    averageParticipantsCount\n    runningConferences\n    totalOrganizedConferences\n  }\n":
      TadaDocumentNode<{ participantsCount: number; averageParticipantsCount: number; runningConferences: number; totalOrganizedConferences: number; }, {}, { fragment: "OrganizerMetrics"; on: "OrganizerMetrics"; masked: true; }>;
    "\n  fragment ParticipantsJoiningTrend on OrganizerMetrics {\n    newParticipantsTrend {\n      date\n      newParticipants\n    }\n  }\n":
      TadaDocumentNode<{ newParticipantsTrend: { date: string; newParticipants: number; }[]; }, {}, { fragment: "ParticipantsJoiningTrend"; on: "OrganizerMetrics"; masked: true; }>;
    "\n  fragment UserTickets on User {\n    tickets(page: $page) {\n      data {\n        id\n        conference {\n          id\n          title\n          startDate\n          endDate\n        }\n      }\n      meta {\n        number\n        size\n        totalItems\n        totalPages\n      }\n    }\n  }\n":
      TadaDocumentNode<{ tickets: { data: { id: string; conference: { id: number; title: string; startDate: string; endDate: string; }; }[]; meta: { number: number; size: number; totalItems: number; totalPages: number; }; }; }, {}, { fragment: "UserTickets"; on: "User"; masked: true; }>;
    "\n  fragment NewsFragment on NewsPage {\n    data {\n      id\n      title\n      content\n      date\n    }\n    meta {\n      page {\n        totalItems\n        totalPages\n        number\n        size\n      }\n    }\n  }\n":
      TadaDocumentNode<{ data: { id: number; title: string; content: string; date: string; }[]; meta: { page: { totalItems: number; totalPages: number; number: number; size: number; }; }; }, {}, { fragment: "NewsFragment"; on: "NewsPage"; masked: true; }>;
    "\n  fragment TermsOfServiceFragment on TermsOfService {\n    introduction\n    acknowledgement\n    updatedAt\n    sections {\n      id\n      title\n      content\n      subsections {\n        id\n        title\n        content\n      }\n    }\n  }\n":
      TadaDocumentNode<{ introduction: string; acknowledgement: string; updatedAt: string; sections: { id: number; title: string | null; content: string | null; subsections: { id: number; title: string; content: string; }[]; }[]; }, {}, { fragment: "TermsOfServiceFragment"; on: "TermsOfService"; masked: true; }>;
    "\n  mutation EditPassword($password: String!) {\n    editPassword(password: $password)\n  }\n":
      TadaDocumentNode<{ editPassword: boolean | null; }, { password: string; }, void>;
    "\n  mutation Login($loginUserInput: LoginUserInput!) {\n    loginUser(loginUserInput: $loginUserInput)\n  }\n":
      TadaDocumentNode<{ loginUser: string; }, { loginUserInput: { password: string; email: string; }; }, void>;
    "\n  mutation UpdateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput)\n  }\n":
      TadaDocumentNode<{ updateUser: number; }, { updateUserInput: { email: string; username: string; surname: string; name: string; }; }, void>;
    "\n  mutation Register($registerUserInput: RegisterUserInput!) {\n    registerUser(registerUserInput: $registerUserInput)\n  }\n":
      TadaDocumentNode<{ registerUser: string; }, { registerUserInput: { role: "Organizer" | "Participant"; password: string; email: string; }; }, void>;
    "\n  query isUserAssociatedWithConference($conferenceId: ID!) {\n    isUserAssociatedWithConference(conferenceId: $conferenceId)\n  }\n":
      TadaDocumentNode<{ isUserAssociatedWithConference: boolean; }, { conferenceId: number; }, void>;
    "\n    query GetAgenda($id: ID!) {\n      conference(id: $id) {\n        ...AgendaFragment\n      }\n    }\n  ":
      TadaDocumentNode<{ conference: { [$tada.fragmentRefs]: { AgendaFragment: "Conference"; }; }; }, { id: number; }, void>;
    "\n    query GetConferenceDetails($id: ID!) {\n      conference(id: $id) {\n        ...ConferenceDetailsFragment\n      }\n    }\n  ":
      TadaDocumentNode<{ conference: { [$tada.fragmentRefs]: { ConferenceDetailsFragment: "Conference"; }; }; }, { id: number; }, void>;
    "\n    query GetConferenceFiles($id: ID!) {\n      conference(id: $id) {\n        ...ConferenceFilesFragment\n      }\n    }\n  ":
      TadaDocumentNode<{ conference: { [$tada.fragmentRefs]: { ConferenceFilesFragment: "Conference"; }; }; }, { id: number; }, void>;
    "\n    query GetAgenda($id: ID!) {\n      conference(id: $id) {\n        ...ConferenceFormData\n      }\n    }\n  ":
      TadaDocumentNode<{ conference: { [$tada.fragmentRefs]: { ConferenceFormData: "Conference"; }; }; }, { id: number; }, void>;
    "\n    query GetConferencesMetrics {\n      conferences {\n        metrics {\n          ...ConferenceMetrics\n        }\n      }\n    }\n  ":
      TadaDocumentNode<{ conferences: { metrics: { [$tada.fragmentRefs]: { ConferenceMetrics: "ConferencesMetrics"; }; }; }; }, {}, void>;
    "\n    query GetParticipantsJoiningTrend {\n      user {\n        metrics {\n          ...ParticipantsJoiningTrend\n        }\n      }\n    }\n  ":
      TadaDocumentNode<{ user: { metrics: { [$tada.fragmentRefs]: { ParticipantsJoiningTrend: "OrganizerMetrics"; }; } | null; } | null; }, {}, void>;
    "\n    query GetOrganizerMetrics {\n      user {\n        metrics {\n          ...OrganizerMetrics\n        }\n      }\n    }\n  ":
      TadaDocumentNode<{ user: { metrics: { [$tada.fragmentRefs]: { OrganizerMetrics: "OrganizerMetrics"; }; } | null; } | null; }, {}, void>;
    "\n    query UserTicketsPage($page: Page!) {\n      user {\n        ...UserTickets\n      }\n    }\n  ":
      TadaDocumentNode<{ user: { [$tada.fragmentRefs]: { UserTickets: "User"; }; } | null; }, { page: { size: number; number: number; }; }, void>;
    "\n    query NewsPage($page: Page) {\n      news(page: $page) {\n        ...NewsFragment\n      }\n    }\n  ":
      TadaDocumentNode<{ news: { [$tada.fragmentRefs]: { NewsFragment: "NewsPage"; }; }; }, { page?: { size: number; number: number; } | null | undefined; }, void>;
    "\n    query GetTermsOfService {\n      termsAndConditions {\n        ...TermsOfServiceFragment\n      }\n    }\n  ":
      TadaDocumentNode<{ termsAndConditions: { [$tada.fragmentRefs]: { TermsOfServiceFragment: "TermsOfService"; }; }; }, {}, void>;
  }
}
