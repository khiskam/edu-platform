import { useState } from "react";
import { useLocation } from "react-router-dom";

import { TaskApi } from "@/shared/api";
import { AnswerData } from "@/shared/types";

import { toAnswers } from "./utils";

export const useSubmit = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const { mutateAsync, isPending } = TaskApi.useCreateAnswerMutation();

  const onSubmit = (id: string, reset: () => void) => async (data: AnswerData) => {
    try {
      const answers = toAnswers(data);
      await mutateAsync({ answers, id });
      setSuccess(true);
    } catch (e) {
      setFailure(true);
      reset?.();
    }
  };

  return {
    onSubmit,
    isPending,
    success,
    failure,
    onSuccess: () => setSuccess(false),
    onFailure: () => setFailure(false),
  };
};

export const useTasksPage = () => {
  const location = useLocation();

  const routes = location.pathname.split("/");
  routes.pop();

  return routes.join("/");
};
