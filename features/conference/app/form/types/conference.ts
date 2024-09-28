import { MergeTypes } from '@/utils/merge-types';

import { CreateConferenceInput } from '../graphql/create-conference';
import { ModifyConferenceInput } from '../graphql/modify-conference';

export type ConferenceInput = Omit<
  MergeTypes<CreateConferenceInput, ModifyConferenceInput>,
  'agenda' | 'files'
>;
