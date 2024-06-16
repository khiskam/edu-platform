import Divider from "antd/es/divider";
import Empty from "antd/es/empty";
import Flex from "antd/es/flex";
import Spin from "antd/es/spin";

import { User } from "@/layouts";
import { UserApi } from "@/shared/api";
import { GAP } from "@/shared/theme";

import { useFormSubmit } from "./hooks";

export const Profile = () => {
  const { data, isLoading, isRefetching } = UserApi.useGetOneDetailsQuery();
  const { onSubmit, isPending } = useFormSubmit();

  if (isLoading) {
    return <Spin />;
  }

  if (!data) {
    return <Empty description={"Не получилось получить данные о пользователе ..."} />;
  }

  const { firstName, lastName, role, monthlyActions, statistics, email } = data.user;

  return (
    <Spin spinning={isRefetching || isPending}>
      <Flex gap={GAP[32]} vertical>
        <User.ProfileData data={{ firstName, lastName, role, email }} />
        <Divider />
        <User.ProfileForm defaultValues={{ firstName, lastName }} onSubmit={onSubmit} />
        <Divider />
        <User.ProfileActivity data={{ monthlyActions, statistics }} />
      </Flex>
    </Spin>
  );
};
