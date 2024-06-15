import { useTheme } from "@emotion/react";
import { useDebounceFn } from "ahooks";
import Input from "antd/es/input";
import { useSearchParams } from "react-router-dom";

import { search } from "./styled";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { run } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ q: e.target.value });
    },
    { wait: 400 }
  );

  const theme = useTheme();

  return (
    <Input.Search
      placeholder="Введите название категории..."
      allowClear
      size="middle"
      onChange={run}
      className={search(theme)}
      defaultValue={searchParams.get("q") ?? ""}
    />
  );
};
