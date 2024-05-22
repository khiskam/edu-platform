import { PaginationProps } from "antd";
import { useLayoutEffect } from "react";
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

  const onChange = (page: number) => {
    setSearchParams((prev) => setCurrentPage(prev, page));
  };

  const config: PaginationProps = {
    hideOnSinglePage: true,
    total: totalCount,
    defaultCurrent: getCurrentPage(searchParams),
    onChange: onChange,
  };

  return { searchParams, config };
};
