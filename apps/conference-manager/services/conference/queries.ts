import { queryOptions } from "@tanstack/react-query";

import {
  ConferenceField,
  Order,
  QueryConferencesArgs,
} from "@/graphql/__types__/types";

import { getAgenda, getConference, getConferences } from ".";

function getConferencesQueryOptions(vars: QueryConferencesArgs) {
  const associatedOnly = vars.filters?.associatedOnly ?? false;
  const pageOptions = vars.page ?? { number: 1, size: 10 };
  const sortOptions = vars.filters?.sort ?? {
    order: Order.Desc,
    column: ConferenceField.Date,
  };
  const title = vars.filters?.title ?? "";

  return queryOptions({
    queryKey: [
      "conferences",
      `page:${pageOptions.number}`,
      `pageSize:${pageOptions.size}`,
      `sortColumn:${sortOptions.column}`,
      `sortOrder:${sortOptions.order}`,
      `associatedOnly:${associatedOnly}`,
      `title:${title}`,
    ],
    queryFn: () => getConferences(vars),
  });
}

function getConferenceQueryOptions(id: string) {
  return queryOptions({
    queryKey: [`conference:${id}`],
    queryFn: () => getConference(id),
  });
}

function getAgendaQueryOptions(id: string) {
  return queryOptions({
    queryKey: [`agenda:${id}`],
    queryFn: () => getAgenda(id),
  });
}

export {
  getConferencesQueryOptions,
  getConferenceQueryOptions,
  getAgendaQueryOptions,
};
