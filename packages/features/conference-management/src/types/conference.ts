import { type CreateConferenceInput } from '#services/create-conference';
import { type ModifyConferenceInput } from '#services/modify-conference';
import { type MergeTypes } from '#utils/merge-types';

export type ConferenceInput = Omit<
  MergeTypes<CreateConferenceInput, ModifyConferenceInput>,
  'agenda' | 'files'
>;
