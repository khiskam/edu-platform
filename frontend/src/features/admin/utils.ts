export const getCurrentPage = (page: string | undefined | null) => {
  if (!page) {
    return 1;
  }

  if (Number.isInteger(+page)) {
    return +page;
  }

  return 1;
};

export const setCurrentPage = (searchParams: URLSearchParams, page: number) => {
  searchParams.set("page", `${page}`);
  return searchParams;
};
