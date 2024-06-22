import {
  ConferenceField,
  ConferenceSort,
  Order,
  Page,
} from "@/graphql/__types__/types";

const pageOptions: Page = {
  number: 1,
  size: 10,
};

const sortOptions: ConferenceSort = {
  order: Order.Desc,
  column: ConferenceField.Date,
};

const associatedOnly = false;

const pageSizeOptions = [10, 25, 50, 100];

export { pageOptions, sortOptions, associatedOnly, pageSizeOptions };
