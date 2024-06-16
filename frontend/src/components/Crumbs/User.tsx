import { Navigate, useParams } from "react-router-dom";

import { UserApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { Skeleton } from "./Skeleton";

export const User = () => {
  const { userId } = useParams();

  if (!userId) {
    return <Navigate to={ROUTES.admin.path} />;
  }

  return <UserCrumb id={userId} />;
};

export const UserCrumb = ({ id }: Id) => {
  const { isLoading, data } = UserApi.useGetOneQuery(id);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      {data?.user.firstName} {data?.user.lastName}
    </>
  );
};
