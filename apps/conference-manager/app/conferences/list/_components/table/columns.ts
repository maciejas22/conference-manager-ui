import { type Conference } from "@/graphql/__types__/conference";

type ColumnKey = Exclude<keyof Conference, "__typename" | "id" | "agenda">;

type Column = {
  key: ColumnKey;
  label: string;
};

const columns: Column[] = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "location", label: "Location" },
  { key: "participantsCount", label: "Participants Count" },
];

export { columns, type Column, type ColumnKey };
