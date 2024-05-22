import { ParsedQs } from "qs";

type QueryString = string | ParsedQs | string[] | ParsedQs[] | undefined;

export const parseId = (id: QueryString) => {
  if (typeof id === "string") {
    return id;
  }

  return "";
};

export const parseLimit = (limit: QueryString) => {
  return toNumber(limit, 10);
};

export const parsePage = (offset: QueryString) => {
  return toNumber(offset, 1);
};

export const toNumber = (num: QueryString, def: number) => {
  if (typeof num === "string" && Number.isInteger(+num)) {
    const result = +num;

    return result > 0 ? result : def;
  }

  return def;
};
