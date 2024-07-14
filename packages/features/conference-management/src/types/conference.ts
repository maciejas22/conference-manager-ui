import { type CreateConferenceInput } from '#services/create-conference';
import { type ModifyConferenceInput } from '#services/modify-conference';
import { type MergeTypes } from '#utils/merge-types';

export type Conference = Omit<
  MergeTypes<CreateConferenceInput, ModifyConferenceInput>,
  'agenda'
>;
