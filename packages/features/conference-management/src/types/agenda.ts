import { type CreateConferenceAgendaItem } from '@/services/create-conference';
import { type ModifyConferenceAgendaItem } from '@/services/modify-conference';

export interface AgendaItem
  extends CreateConferenceAgendaItem,
    ModifyConferenceAgendaItem {}
