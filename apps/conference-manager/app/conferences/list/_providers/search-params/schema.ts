import { z } from "zod";

import { ConferenceField, Order } from "@/graphql/__types__/types";

import { pageSizeOptions } from "../../_options";

const searchParamsSchema = z.object({
  page: z.number().int().positive().catch(1),
  pageSize: z
    .number()
    .int()
    .positive()
    .refine((val) => pageSizeOptions.includes(val))
    .catch(pageSizeOptions[0]),
  sort: z.nativeEnum(ConferenceField).catch(ConferenceField.Date),
  sortDirection: z.nativeEnum(Order).catch(Order.Desc),
  associatedOnly: z.boolean().catch(false),
  title: z.string().catch(""),
});

export { searchParamsSchema };
