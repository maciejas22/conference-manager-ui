import { ConferenceField } from "@/graphql/__types__/types";

import { ColumnKey } from "../_components/table/columns";

const fieldToColumnKeyMap: Record<ConferenceField, ColumnKey> = {
  [ConferenceField.Date]: "date",
  [ConferenceField.Location]: "location",
  [ConferenceField.ParticipantsCount]: "participantsCount",
  [ConferenceField.Title]: "title",
};

const columnKeyToFieldMap: Partial<Record<ColumnKey, ConferenceField>> = {
  date: ConferenceField.Date,
  location: ConferenceField.Location,
  participantsCount: ConferenceField.ParticipantsCount,
  title: ConferenceField.Title,
};

export { fieldToColumnKeyMap, columnKeyToFieldMap };
