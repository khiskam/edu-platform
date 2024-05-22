import { PAGE } from "./constants";

export const getCurrentPage = (searchParams: URLSearchParams) => {
  const page = searchParams.get(PAGE);

  if (!page) return 1;

  if (Number.isInteger(+page)) return +page;

  return 1;
};

export const setCurrentPage = (searchParams: URLSearchParams, page: number) => {
  searchParams.set(PAGE, `${page}`);
  return searchParams;
};
