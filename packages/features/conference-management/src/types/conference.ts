import { type CreateConferenceInput } from '#graphql/create-conference';
import { type ModifyConferenceInput } from '#graphql/modify-conference';
import { type MergeTypes } from '#utils/merge-types';

export type ConferenceInput = Omit<
  MergeTypes<CreateConferenceInput, ModifyConferenceInput>,
  'agenda' | 'files'
>;
