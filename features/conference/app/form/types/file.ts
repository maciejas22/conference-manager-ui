import { MergeTypes } from '@/utils/merge-types';

import { CreateConferenceInputFile } from '../graphql/create-conference';
import { ModifyConferenceInputFile } from '../graphql/modify-conference';

export type FileInput = MergeTypes<
  CreateConferenceInputFile,
  ModifyConferenceInputFile
>;
