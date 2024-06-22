import dayjs, { extend } from "dayjs";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import utcPlugin from "dayjs/plugin/utc";

extend(customParseFormatPlugin);
extend(utcPlugin);

const api = dayjs.utc;
export { api as dayjs };
