import Spin from "antd/es/spin";

import { Admin } from "@/layouts";
import { CategoryApi } from "@/shared/api";
import { Id } from "@/shared/types";

import { useFormSubmit } from "./hooks";

export const UpdateCategory = ({ id }: Id) => {
  const { isLoading, onSubmit } = useFormSubmit(id);
  const { data, isLoading: isDataLoading, isRefetching } = CategoryApi.useGetOneQuery(id);

  if (isDataLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isRefetching || isLoading}>
      <Admin.CategoryForm onSubmit={onSubmit} defaultValues={data?.category} />
    </Spin>
  );
};
