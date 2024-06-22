export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: string; output: string; }
};

export type AgendaItem = {
  __typename?: 'AgendaItem';
  endTime: Scalars['Time']['output'];
  event: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  speaker: Scalars['String']['output'];
  startTime: Scalars['Time']['output'];
};

export type AgendaItemInput = {
  endTime: Scalars['Time']['input'];
  event: Scalars['String']['input'];
  speaker: Scalars['String']['input'];
  startTime: Scalars['Time']['input'];
};

export type Conference = {
  __typename?: 'Conference';
  additionalInfo?: Maybe<Scalars['String']['output']>;
  agenda: Array<AgendaItem>;
  date: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  participantsCount: Scalars['Int']['output'];
  participantsLimit?: Maybe<Scalars['Int']['output']>;
  registrationDeadline?: Maybe<Scalars['Time']['output']>;
  title: Scalars['String']['output'];
};

export enum ConferenceField {
  Date = 'DATE',
  Location = 'LOCATION',
  ParticipantsCount = 'PARTICIPANTS_COUNT',
  Title = 'TITLE'
}

export type ConferenceFilter = {
  associatedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ConferenceSort>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ConferenceMeta = {
  __typename?: 'ConferenceMeta';
  page: PageInfo;
};

export type ConferencePage = {
  __typename?: 'ConferencePage';
  data: Array<Conference>;
  meta: ConferenceMeta;
};

export type ConferenceSort = {
  column: ConferenceField;
  order: Order;
};

export type CreateConferenceInput = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  agenda: Array<AgendaItemInput>;
  date: Scalars['Time']['input'];
  location: Scalars['String']['input'];
  participantsLimit?: InputMaybe<Scalars['Int']['input']>;
  registrationDeadline?: InputMaybe<Scalars['Time']['input']>;
  title: Scalars['String']['input'];
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginUserOutput = {
  __typename?: 'LoginUserOutput';
  token: Scalars['String']['output'];
  user: User;
};

export type ModifyConferenceInput = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  agenda?: InputMaybe<Array<AgendaItemInput>>;
  date?: InputMaybe<Scalars['Time']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  participantsLimit?: InputMaybe<Scalars['Int']['input']>;
  registrationDeadline?: InputMaybe<Scalars['Time']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToConference?: Maybe<Conference>;
  createConference?: Maybe<Conference>;
  loginUser?: Maybe<LoginUserOutput>;
  modifyConference?: Maybe<Conference>;
  registerUser?: Maybe<User>;
  removeUserFromConference?: Maybe<Conference>;
  updatePassword?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAddUserToConferenceArgs = {
  conferenceId: Scalars['String']['input'];
};


export type MutationCreateConferenceArgs = {
  createConferenceInput: CreateConferenceInput;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationModifyConferenceArgs = {
  input: ModifyConferenceInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationRemoveUserFromConferenceArgs = {
  conferenceId: Scalars['String']['input'];
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type News = {
  __typename?: 'News';
  content: Scalars['String']['output'];
  date: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Page = {
  number: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  associatedConferences: Array<Conference>;
  conference?: Maybe<Conference>;
  conferences?: Maybe<ConferencePage>;
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  isParticipant?: Maybe<Scalars['Boolean']['output']>;
  news: Array<News>;
  termsAndConditions: TermsOfService;
  user?: Maybe<User>;
};


export type QueryConferenceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryConferencesArgs = {
  filters?: InputMaybe<ConferenceFilter>;
  page?: InputMaybe<Page>;
};


export type QueryIsOrganizerArgs = {
  conferenceId: Scalars['ID']['input'];
};


export type QueryIsParticipantArgs = {
  conferenceId: Scalars['ID']['input'];
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
  username: Scalars['String']['input'];
};

export enum Role {
  Organizer = 'Organizer',
  Participant = 'Participant'
}

export type Section = {
  __typename?: 'Section';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  subsections: Array<SubSection>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SubSection = {
  __typename?: 'SubSection';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type TermsOfService = {
  __typename?: 'TermsOfService';
  acknowledgement: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  introduction: Scalars['String']['output'];
  lastUpdated: Scalars['Time']['output'];
  sections: Array<Section>;
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
  surname?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};
