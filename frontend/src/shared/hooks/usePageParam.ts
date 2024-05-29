import { PaginationProps } from "antd";
import { useLayoutEffect, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { getCurrentPage, setCurrentPage } from "./utils";

export const usePageParam = <T extends FieldValues>(
  data: T[] | undefined,
  totalCount: number | undefined
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useLayoutEffect(() => {
    if (data?.length === 0 && searchParams.get("page") !== "1") {
      setSearchParams((prev) => {
        prev.delete("page");
        return prev;
      });
    }
  }, [searchParams, setSearchParams, data]);

  const config: PaginationProps = useMemo(
    () => ({
      hideOnSinglePage: true,
      total: totalCount,
      defaultCurrent: getCurrentPage(searchParams),
      onChange: (page: number) => {
        setSearchParams((prev) => setCurrentPage(prev, page));
      },
    }),
    [searchParams, setSearchParams, totalCount]
  );

  return { searchParams, config };
};
