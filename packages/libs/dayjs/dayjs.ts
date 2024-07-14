import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import dayjs from "dayjs";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const api = dayjs.utc;
export { api as dayjs };
