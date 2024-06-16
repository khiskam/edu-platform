import Divider from "antd/es/divider";
import Flex from "antd/es/flex";
import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { User as UserLayout } from "@/layouts";
import { UserApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";
import { Id } from "@/shared/types";

export const User = ({ id }: Id) => {
  const { isLoading, isError, data } = UserApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.admin.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  const { firstName, lastName, role, monthlyActions, statistics, email } = data.user;

  return (
    <Spin spinning={isLoading}>
      <Flex gap={GAP[32]} vertical>
        <UserLayout.ProfileData data={{ firstName, lastName, role, email }} />
        <Divider />
        <UserLayout.ProfileActivity data={{ monthlyActions, statistics }} />
      </Flex>
    </Spin>
  );
};
