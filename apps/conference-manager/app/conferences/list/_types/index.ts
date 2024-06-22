import { z } from "zod";

import { ConferencePage } from "@/graphql/__types__/types";

import { searchParamsSchema } from "../_providers/search-params/schema";

type Conference = NonNullable<ConferencePage["data"][number]>;

type ConferenceMeta = Omit<NonNullable<ConferencePage["meta"]>, "__typename">;

type SearchParams = z.infer<typeof searchParamsSchema>;
type SearchParamsKeys = keyof SearchParams;

export type { Conference, ConferenceMeta, SearchParams, SearchParamsKeys };
