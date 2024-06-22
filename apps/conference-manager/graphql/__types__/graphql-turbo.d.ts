/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "\n  query GetUser {\n    user {\n      id\n      name\n      surname\n      username\n      email\n      role\n    }\n  }\n":
      TadaDocumentNode<{ user: { role: "Organizer" | "Participant"; email: string; username: string; surname: string | null; name: string | null; id: string; } | null; }, {}, void>;
    "\n  query isOrganizer($conferenceID: ID!) {\n    isOrganizer(conferenceId: $conferenceID)\n  }\n":
      TadaDocumentNode<{ isOrganizer: boolean | null; }, { conferenceID: string; }, void>;
    "\n  query isParticipant($conferenceID: ID!) {\n    isParticipant(conferenceId: $conferenceID)\n  }\n":
      TadaDocumentNode<{ isParticipant: boolean | null; }, { conferenceID: string; }, void>;
    "\n  mutation LoginUser($input: LoginUserInput!) {\n    loginUser(loginUserInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n        role\n      }\n    }\n  }\n":
      TadaDocumentNode<{ loginUser: { user: { role: "Organizer" | "Participant"; name: string | null; email: string; id: string; }; token: string; } | null; }, { input: { password: string; username: string; }; }, void>;
    "\n  mutation RegisterUser($input: RegisterUserInput!) {\n    registerUser(registerUserInput: $input) {\n      id\n      name\n      surname\n      username\n      email\n      role\n    }\n  }\n":
      TadaDocumentNode<{ registerUser: { role: "Organizer" | "Participant"; email: string; username: string; surname: string | null; name: string | null; id: string; } | null; }, { input: { role: "Organizer" | "Participant"; password: string; email: string; username: string; }; }, void>;
    "\n  mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {\n    updatePassword(updatePasswordInput: $updatePasswordInput) {\n      id\n      username\n    }\n  }\n":
      TadaDocumentNode<{ updatePassword: { username: string; id: string; } | null; }, { updatePasswordInput: { newPassword: string; currentPassword: string; }; }, void>;
    "\n  mutation UpdateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      username\n    }\n  }\n":
      TadaDocumentNode<{ updateUser: { username: string; id: string; } | null; }, { updateUserInput: { email: string; username: string; surname: string; name: string; }; }, void>;
    "\n  mutation AddUserToConference($conferenceId: String!) {\n    addUserToConference(conferenceId: $conferenceId) {\n      id\n    }\n  }\n":
      TadaDocumentNode<{ addUserToConference: { id: string; } | null; }, { conferenceId: string; }, void>;
    "\n  mutation CreateConference($createConferenceInput: CreateConferenceInput!) {\n    createConference(createConferenceInput: $createConferenceInput) {\n      id\n    }\n  }\n":
      TadaDocumentNode<{ createConference: { id: string; } | null; }, { createConferenceInput: { agenda: { speaker: string; event: string; endTime: string; startTime: string; }[]; registrationDeadline?: string | null | undefined; participantsLimit?: number | null | undefined; additionalInfo?: string | null | undefined; location: string; date: string; title: string; }; }, void>;
    "\n  query GetAgenda($id: ID!) {\n    conference(id: $id) {\n      id\n      agenda {\n        id\n        startTime\n        endTime\n        event\n        speaker\n      }\n    }\n  }\n":
      TadaDocumentNode<{ conference: { agenda: { speaker: string; event: string; endTime: string; startTime: string; id: string; }[]; id: string; } | null; }, { id: string; }, void>;
    "\n  query GetAssociatedConferences {\n    associatedConferences {\n      id\n      title\n      date\n      location\n      participantsCount\n    }\n  }\n":
      TadaDocumentNode<{ associatedConferences: { participantsCount: number; location: string; date: string; title: string; id: string; }[]; }, {}, void>;
    "\n  query GetConference($id: ID!) {\n    conference(id: $id) {\n      id\n      title\n      date\n      location\n      additionalInfo\n      participantsCount\n      participantsLimit\n      registrationDeadline\n    }\n  }\n":
      TadaDocumentNode<{ conference: { registrationDeadline: string | null; participantsLimit: number | null; participantsCount: number; additionalInfo: string | null; location: string; date: string; title: string; id: string; } | null; }, { id: string; }, void>;
    "\n  query GetConferences($filters: ConferenceFilter, $page: Page) {\n    conferences(filters: $filters, page: $page) {\n      data {\n        id\n        title\n        date\n        location\n        participantsCount\n      }\n      meta {\n        page {\n          totalItems\n          totalPages\n        }\n      }\n    }\n  }\n":
      TadaDocumentNode<{ conferences: { meta: { page: { totalPages: number; totalItems: number; }; }; data: { participantsCount: number; location: string; date: string; title: string; id: string; }[]; } | null; }, { page?: { size: number; number: number; } | null | undefined; filters?: { title?: string | null | undefined; sort?: { order: "ASC" | "DESC"; column: "TITLE" | "DATE" | "LOCATION" | "PARTICIPANTS_COUNT"; } | null | undefined; associatedOnly?: boolean | null | undefined; } | null | undefined; }, void>;
    "\n  mutation ModifyConference($input: ModifyConferenceInput!) {\n    modifyConference(input: $input) {\n      id\n    }\n  }\n":
      TadaDocumentNode<{ modifyConference: { id: string; } | null; }, { input: { agenda?: { speaker: string; event: string; endTime: string; startTime: string; }[] | null | undefined; registrationDeadline?: string | null | undefined; participantsLimit?: number | null | undefined; additionalInfo?: string | null | undefined; location?: string | null | undefined; date?: string | null | undefined; title?: string | null | undefined; id: string; }; }, void>;
    "\n  mutation RemoveUserFromConference($conferenceId: String!) {\n    removeUserFromConference(conferenceId: $conferenceId) {\n      id\n    }\n  }\n":
      TadaDocumentNode<{ removeUserFromConference: { id: string; } | null; }, { conferenceId: string; }, void>;
    "\n  query GetNews {\n    news {\n      id\n      title\n      content\n      date\n    }\n  }\n":
      TadaDocumentNode<{ news: { date: string; content: string; title: string; id: string; }[]; }, {}, void>;
    "\n  query GetTermsOfService {\n    termsAndConditions {\n      id\n      introduction\n      acknowledgement\n      lastUpdated\n      sections {\n        id\n        title\n        content\n        subsections {\n          id\n          title\n          content\n        }\n      }\n    }\n  }\n":
      TadaDocumentNode<{ termsAndConditions: { sections: { subsections: { content: string | null; title: string | null; id: string; }[]; content: string | null; title: string | null; id: string; }[]; lastUpdated: string; acknowledgement: string; introduction: string; id: string; }; }, {}, void>;
  }
}
