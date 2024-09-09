import { type MergeTypes } from '@repo/shared/utils/merge-types';

import { type CreateConferenceInput } from '@/graphql/create-conference';
import { type ModifyConferenceInput } from '@/graphql/modify-conference';

export type ConferenceInput = Omit<
  MergeTypes<CreateConferenceInput, ModifyConferenceInput>,
  'agenda' | 'files'
>;
